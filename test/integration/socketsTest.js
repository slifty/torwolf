var should = require('chai').should(),
	request = require('supertest'),
	async = require('async'),
	io = require('socket.io-client'),
	url = 'http://localhost:3000',
	userFactory = require('../factories/user'),
	gameFactory = require('../factories/game'),
	payloads = require('../../payloads'),
	messageTypes = require('../../message-types'),
	constants = require('../../constants');

if (!global.hasOwnProperty('testApp')) {
	global.testApp = require('../../server');
}

var app = global.testApp;
var socket;

describe('Core sockets', function() {
	var game = undefined;
	var gameTemplate = undefined;
	var agent = request.agent(app.app);

	beforeEach(function(done) {
		var user = userFactory.create();
		async.waterfall([
			function(cb) {
				agent
					.post('/users')
					.send(user)
					.end(cb);
			},
			function(response, cb) {
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
			game = response.body;
			done();
		});
	});

	it('Should heartbeat', function (done) {
		var expectedCount = 0;
		constants.TICK_HEARTBEAT = 300;
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
