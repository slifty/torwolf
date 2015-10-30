var should = require('chai').should(),
	request = require('supertest'),
	async = require('async'),
	io = require('socket.io-client'),
	userFactory = require('../factories/user'),
	gameFactory = require('../factories/game'),
	payloads = require('../../payloads'),
	messageTypes = require('../../message-types'),
	constants = require('../../constants'),
	_ = require('lodash'),
	gameState = require('../../app/lib/gameState'),
	locales = require('../../locales'),
	gameRepository = require('../../app/repositories/game');

constants.TICK_HEARTBEAT = 1000;
constants.TICK_LENGTH = 200;

if (!global.hasOwnProperty('testApp')) {
	global.testApp = require('../../server');
}

var app = global.testApp;

describe('Core sockets', function() {
	var game = undefined;
	var gameTemplate = undefined;
	var users = undefined;
	var user = undefined;
	var agent = request.agent(app.app);
	var socket = undefined;
	this.timeout(5000);

	var startGame = function() {
		for (var index in users) {
			player = users[index];
			payload = new payloads.StorytellerJoinInPayload(player, game);
			socket.emit('message', {
				payload: payload.getPayload()
			});
		}
	};

	beforeEach(function(done) {
		socket = io.connect('http://localhost:3000', {'force new connection': true});
		async.waterfall([
			function(cb) {
				async.times(8, function(n, next) {
					user = userFactory.create();
					agent
						.post('/users')
						.send(user)
						.end( function(err, response) {
							if (err || response.statusCode != 200) {
								return next(err);
							}
							next(null, response);
						});
				}, function(err, responses) {
					if (err) {
						return cb(err);
					}
					cb(null, responses);
				});
			},
			function(responses, cb) {
				users = _.pluck(responses, 'body');
				agent
					.post('/login')
					.send({email: user.email, password: user.password})
					.end(cb);
			},
			function(response, cb) {
				agent
					.post('/games')
					.send(gameFactory.create())
					.end(cb);
			}
		], function(err, response) {
			if (err) {
				return done(err);
			}
			response.statusCode.should.equal(200);
			game = response.body;
			done();
		});
	});

	afterEach(function(done) {
		socket.disconnect();
		done();
	});

	it('Should heartbeat', function (done) {
		var expectedCount = 0;
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_HEARTBEATPING) {
				if (data.payload.data.count === 2) {
					done();
				}
				data.payload.data.count.should.equal(expectedCount);
				expectedCount++;
				data.payload.type.should.equal(messageTypes.STORYTELLER_HEARTBEATPING);
				payload = new payloads.StorytellerHeartbeatInPayload({id: game.id}, data.payload.data.count);
				socket.emit('message', {
					payload: payload.getPayload()
				});
			}
		});
	});

	it('Should allow players to join game', function(done) {
		var expectedUsers = _.indexBy(users, 'id');
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_JOINED) {
				playerId = data.payload.data.playerId;
				game = gameState.getGameById(game.id);
				for (var index in game.players) {
					player = game.players[index];
					should.exist(player);
				}
				delete expectedUsers[playerId];
				game.players.length.should.equal(2);
				// FIXME should be 6
				if (Object.keys(expectedUsers).length === 7) {
					done();
				}
			}
		});
		joinPayload = new payloads.StorytellerJoinInPayload(users[0], game);
		socket.emit('message', {
			payload: joinPayload.getPayload()
		});
		joinPayload = new payloads.StorytellerJoinInPayload(users[1], game);
		socket.emit('message', {
			payload: joinPayload.getPayload()
		});
	});

	it('Should assign roles when a game starts', function(done) {
		expectedUsers = _.indexBy(users, 'id');

		var roles = {};
		roles[constants.PLAYER_ROLE_ACTIVIST] = 1;
		roles[constants.PLAYER_ROLE_CITIZEN_ACTIVIST] = 3;
		roles[constants.PLAYER_ROLE_CITIZEN_APATHETIC] = 1;
		roles[constants.PLAYER_ROLE_JOURNALIST] = 1;
		roles[constants.PLAYER_ROLE_AGENT] = 1;
		roles[constants.PLAYER_ROLE_CITIZEN_AGENT] = 1;

		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_ROLESET) {
				roles[data.payload.data.role]--;
				if (roles[data.payload.data.role] === 0) {
					delete roles[data.payload.data.role];
				}
				delete expectedUsers[data.payload.data.playerId];
				if (_.isEmpty(roles) && _.isEmpty(expectedUsers)) {
					return done();
				}
			}
		});
		startGame();
	});

	it('Should assign allegiances when a game starts', function(done) {
		var expectedUsers = _.indexBy(users, 'id');

		var allegiances = {};
		allegiances[constants.PLAYER_ALLEGIANCE_GOVERNMENT] = 2;
		allegiances[constants.PLAYER_ALLEGIANCE_NEUTRAL] = 2;
		allegiances[constants.PLAYER_ALLEGIANCE_REBELLION] = 4;

		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_ALLEGIANCECHANGE) {
				allegiances[data.payload.data.allegiance] -= 1;
				if (allegiances[data.payload.data.allegiance] === 0) {
					delete allegiances[data.payload.data.allegiance];
				}
				delete expectedUsers[data.payload.data.playerId];
				if (_.isEmpty(allegiances) && _.isEmpty(expectedUsers)) {
					return done();
				}
			}
		});
		startGame();
	});

	it('Should assign rumors when a game starts', function(done) {
		trueRumors = 0;
		falseRumors = 0;
		var expectedUsers = _.indexBy(users, 'id');
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_RUMORRECEIVED) {
				rumor = data.payload.data;
      			should.exist(rumor.text);
      			rumor.destinationId.should.equal(rumor.sourceId);
      			rumor.rumorId.should.exist;
      			rumor.publicationStatus.should.equal(constants.RUMOR_PUBLICATIONSTATUS_UNPUBLISHED);
      			should.exist(rumor.truthStatus);
      			switch (rumor.truthStatus) {
      				case constants.RUMOR_TRUTHSTATUS_TRUE:
      					trueRumors++;
      					break;
  					case constants.RUMOR_TRUTHSTATUS_FALSE:
  						falseRumors++;
  						break
      			}
				delete expectedUsers[rumor.sourceId];
				if (_.isEmpty(expectedUsers) && falseRumors === 7 && trueRumors === 1) {
					return done();
				}
			}
		});
		startGame();
	});

	it('Should subpoena irc', function(done) {
		var tick = 0;
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_TOCK) {
				tick++;
				return;
			}

			if (data.payload.type === messageTypes.STORYTELLER_IRCSUBPOENAD) {
				tick /= 8; // 8 players receive tick messages
				tick.should.equal(constants.TICK_IRCSUBPOENA);
				done();
			}
		});
		startGame();
	});

	it('Should subpoena email', function(done) {
		var tick = 0;
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_TOCK) {
				tick++;
				return;
			}

			if (data.payload.type === messageTypes.STORYTELLER_EMAILSUBPOENAD) {
				tick /= 8; // 8 players receive tick messages
				tick.should.equal(constants.TICK_EMAILSUBPOENA);
				done();
			}
		});
		startGame();
	});

	it('Should start ticks when a game starts', function(done) {
		var expectedCount = 2;
		var actualCount = 0;
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_TOCK && ++actualCount === expectedCount) {
				gameRepository.get(game.id, function(err, game) {
					if (err) {
						return done(err);
					}
					game.phase.should.equal('STARTED');
					done();
				});
			}
		});
		startGame();
	});

	it('Should kill a player', function(done) {
		killedEventsReceived = 0;
		gameOversReceived = 0;
		resultsReceived = 0;
		var playerId = undefined;
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_ROLESET &&
				data.payload.data.role === constants.PLAYER_ROLE_AGENT ) {
				playerId = data.payload.data.playerId;
				killPayload = new payloads.StorytellerKillInPayload({ id: playerId }, game);
				socket.emit('message', {
					payload: killPayload.getPayload()
				});
			} else if (data.payload.type === messageTypes.STORYTELLER_KILLED) {
				data.payload.data.playerId.should.equal(playerId);
				killedEventsReceived++;
			} else if (data.payload.type === messageTypes.STORYTELLER_ANNOUNCEMENT) {
				if (data.payload.data.text === locales['default'].messages.storyteller.VICTORY_ACTIVISTS_KILLING) {
					resultsReceived++;
				} else if (data.payload.data.text === locales['default'].messages.storyteller.GAMEOVER) {
					gameOversReceived++;
				}
			} else {
				// do nothing
			}
			if (killedEventsReceived === 8 && resultsReceived === 8 && gameOversReceived === 8) {
				gameRepository.get(game.id, function(err, game) {
					if (err) {
						return done(err);
					}
					game.phase.should.equal('COMPLETED');
					done();
				});
			}
		});
		startGame();
	});

	it('Should start game when enough players have joined', function(done) {
		socket.on('message', function(data) {
			if (data.payload.type === messageTypes.STORYTELLER_TOCK) {
				done();
			}
			// TODO: assert
		});
		startGame();
	});
});
