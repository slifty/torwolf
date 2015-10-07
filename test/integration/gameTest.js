var should = require('chai').should();
var request = require('supertest');
var moment = require('moment');
var async = require('async');
var _ = require('lodash');

var url = 'http://localhost:3000';

if (!global.hasOwnProperty('testApp')) {
	global.testApp = require('../../server');
}
var app = global.testApp;

describe('Game routes', function() {
	var game = undefined;
	var gameTemplate = undefined;
	var agent = request.agent(app.app);

	var assertGame = function(newGame, expectedGame) {
		newGame.name.should.equal(expectedGame.name);
		newGame.description.should.equal(expectedGame.description);
		newGame.id.should.exist;
		should.not.exist(newGame.victor);
		newGame.phase.should.equal('FORMING');
		should.not.exist(newGame.completedAt);
		should.not.exist(newGame.startedAt);
		newGame.createdAt.should.exist;
		moment(newGame.createdAt).format.should.not.equal('Invalid date');
		newGame.updatedAt.should.exist;
		moment(newGame.updatedAt).format.should.not.equal('Invalid date');
	}

	var assertGameById = function(id, expectedGame, agent, cb) {
		agent
			.get('/games/' + id )
			.end(function(err, response) {
				if (err) {
					return cb(err);
				}
				response.statusCode.should.equal(200);
				var game = response.body;
				assertGame(game, expectedGame);
				cb()
		});
	}

	beforeEach(function(done) {
		gameTemplate = {
			name: 'Bowser\s Kingdom',
			description: 'Kingdom of the Koopa'
		};
		var user = {
			username: 'dry bones' + Math.random(),
			password: 'bowser sucks',
			email: 'drybones' + Math.random() + '@koopakingdom.com'
		};

		async.waterfall([
			function(cb) {
			    agent
					.post('/users')
					.send(_.cloneDeep(user))
					.end(cb);
			},
			function(response, cb) {
				agent
					.post('/login')
					.send({email: user.email, password: user.password})
					.end(cb);
			},
			function(response, cb) {
				async.times(25, function(n, next) {
					gameTemplate = _.cloneDeep(gameTemplate);
					gameTemplate.name = 'Game ' + n;
					gameTemplate.phase = (n % 2 == 0 ? 'FORMING' : 'STARTED')
				    agent
						.post('/games')
						.send(gameTemplate)
						.end( function(err, response) {
							if (err) {
								return next(err);
							}
							next();
						});
				}, function(err) {
					if (err) {
						return cb(err);
					}
					cb();
				});
			}
		], done);
	});

	it('Should create games', function (done) {
	    agent
			.post('/games')
			.send(_.cloneDeep(gameTemplate))
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(200);
				var game = response.body;
				assertGame(game, gameTemplate);
				done();
			});
	});

	it('Should filter by phase', function(done) {
	    agent
			.get('/games?phase=FORMING,COMPLETED')
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(200);
				var resultSet = response.body;
				resultSet.start.should.equal(0);
				resultSet.totalCount.should.exist;
				resultSet.results.should.have.length(20);
				resultSet.results.forEach(function(game) {
					game.phase.should.equal('FORMING');
				});
				done();
			});
	});

	it('Should page', function(done) {
	    agent
			.get('/games?offset=3&limit=10')
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(200);
				var resultSet = response.body;
				resultSet.start.should.equal(3);
				resultSet.totalCount.should.exist;
				resultSet.results.should.have.length(10);
				done();
			});
	});

	it('Should filter by name', function(done) {
	    agent
			.get('/games?name=Ga%2515')
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(200);
				var resultSet = response.body;
				resultSet.start.should.equal(0);
				resultSet.totalCount.should.exist;
				resultSet.results.should.have.length(20);
				resultSet.results.forEach(function(game) {
					game.name.should.equal('Game ' + 15);
				});
				done();
			});
	});
});
