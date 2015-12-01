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

describe('Irc Events', function() {
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

	it('Should allow nick changes', function(done) {
		done();
	});

	it('Should allow messages', function(done) {
		done();
	});

	it('Should allow emotes', function(done) {
		done();
	});

	it.only('Should allow joining of server', function(done) {
		announceMessages = {};
		announceMessages[locales['default'].messages.irc.CONNECTING] = true;
		announceMessages[locales['default'].messages.irc.CONNECTED] = true;
		announceMessages[locales['default'].messages.irc.MOTD] = true;
		announceMessages[locales['default'].messages.irc.JOINED] = true;
		announceMessages['joined'] = true;
		socket.on('message', function(data) {
			if(_.isEmpty(announceMessages)) {
				return done();
			}

			if (data.payload.type === messageTypes.IRC_JOINED && data.payload.data.nick !== 'Dry Bones') {
				var joinIn = new payloads.IrcJoinInPayload({username: 'Dry Bones', id: users[0].id});
				socket.emit('message', {
					payload: joinIn.getPayload()
				});
			} else if (data.payload.type === messageTypes.IRC_JOINED) {
				delete announceMessages['joined'];
			} else if (data.payload.type === messageTypes.IRC_MESSAGED) {
				delete announceMessages[data.payload.data.text];
			} else {
				// do nothing
			}
		});
		startGame();
	});

	it('Should allow leaving of server', function(done) {
		done();
	});
});
