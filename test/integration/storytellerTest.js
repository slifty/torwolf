var should = require('chai').should(),
	request = require('supertest'),
	async = require('async'),
	io = require('socket.io-client'),
	url = 'http://localhost:3000',
	userFactory = require('../factories/user'),
	gameFactory = require('../factories/game'),
	payloads = require('../../payloads'),
	messageTypes = require('../../message-types'),
	constants = require('../../constants'),
	_ = require('lodash');

constants.TICK_HEARTBEAT = 300;

if (!global.hasOwnProperty('testApp')) {
	global.testApp = require('../../server');
}

var app = global.testApp;
var socket;

describe('Core sockets', function() {
	var game = undefined;
	var gameTemplate = undefined;
	var users = undefined;
	var user = undefined;
	var agent = request.agent(app.app);
	this.timeout(5000);

	beforeEach(function(done) {
		async.waterfall([
			function(cb) {
				async.times(2, function(n, next) {
					user = userFactory.create();
					agent
						.post('/users')
						.send(user)
						.end( function(err, response) {
							if (err) {
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

	it.only('Should allow players to join game', function(done) {
		var socket = require('socket.io-client')('http://localhost:3000');
		var expectedUsers = _.indexBy(users, 'id');
		socket.on('message', function(data) {
			if (data.type === messageTypes.STORYTELLER_JOINED) {
				should.exist(expectedUsers[data.payload.player.id]);
				agent
					.get('/games/' + game.id)
					.end(function(err, response) {
						var game = response.body;
						game.Users.should.have.length(2);
						delete expectedUsers[data.payload.player.id];
						if (_.isEmpty(expectedUsers)) {
							done();
						}
					});
			}
		});
		socket.emit('message', {
			payload: new payloads.StorytellerJoinInPayload(users[0], game),
			type: messageTypes.STORYTELLER_JOIN
		});
		setTimeout(function() {
			socket.emit('message', {
				payload: new payloads.StorytellerJoinInPayload(users[1], game),
				type: messageTypes.STORYTELLER_JOIN
			});
		}, 1500);
	});

	it('Should start game when enough players have joined', function(done) {
		done();
	});

	it('Should heartbeat', function (done) {
		var expectedCount = 0;
		var socket = require('socket.io-client')('http://localhost:3000');
		socket.on('message', function(data) {
			if (data.payload.count === 3) {
				done();
			}
			data.payload.count.should.equal(expectedCount);
			expectedCount++;
			data.type.should.equal(messageTypes.STORYTELLER_HEARTBEATPING);
			socket.emit('message', {
				payload: new payloads.StorytellerHeartbeatInPayload({id: game.id}, data.payload.count),
				type: messageTypes.STORYTELLER_HEARTBEATPONG
			});
		});
	});
});
