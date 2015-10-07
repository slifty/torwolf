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

describe('User routes', function() {
	var user = undefined;
	var userTemplate = undefined;

	var assertUser = function(newUser, expectedUser) {
		newUser.username.should.equal(expectedUser.username);
		newUser.password.should.exist;
		newUser.password.should.not.equal(expectedUser.password);
		newUser.email.should.equal(expectedUser.email);
		newUser.id.should.exist;
		newUser.createdAt.should.exist;
		moment(newUser.createdAt).format.should.not.equal('Invalid date');
		newUser.updatedAt.should.exist;
		moment(newUser.updatedAt).format.should.not.equal('Invalid date');
	}

	var assertUserById = function(id, expectedUser, agent, cb) {
		agent
			.get('/users/' + id )
			.end(function(err, response) {
				if (err) {
					return cb(err);
				}
				response.statusCode.should.equal(200);
				var user = response.body;
				assertUser(user, expectedUser);
				cb()
		});
	}

	beforeEach(function(done) {
		userTemplate = {
			username: 'dry bones' + Math.random(),
			password: 'bowser sucks',
			email: 'drybones' + Math.random() + '@koopakingdom.com'
		};
	    request(url)
			.post('/users')
			.send(_.cloneDeep(userTemplate))
			.end(function (err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(200);
				user = response.body;
				done();
		});
	});

	it('Should create users', function (done) {
		var userTemplate = {
			username: 'dry bones' + Math.random(),
			password: 'bowser sucks',
			email: 'drybones' + Math.random() + '@koopakingdom.com'
		};
	    request(url)
			.post('/users')
			.send(_.cloneDeep(userTemplate))
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(200);
				this.user = response.body;
				assertUser(this.user, userTemplate);
				done();
			});
	});

	it('Should authenticate a user', function(done) {
	    request(url)
			.post('/login')
			.send({email: userTemplate.email, password: userTemplate.password})
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(302);
				response.headers.location.should.equal('/');
				done();
			});
	});

	it('Should not allow user to authenticate with incorrect credentials', function(done) {
	    request(url)
			.post('/login')
			.send({email: userTemplate.email, password: 'lulz'})
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(302);
				response.headers.location.should.equal('/login');
				done();
			});
	});

	it('Should allow updates to users', function(done) {
		var updatedUser = undefined;
		var agent = request.agent(app.app);
		async.waterfall([
			function(cb) {
			    agent
			    	.post('/login')
					.send(_.cloneDeep(userTemplate))
					.end(cb);
			},
			function(response, cb) {
				updatedUser = {
					username: 'dry bones' + Math.random(),
					password: 'bowser sucks a lot',
					email: 'drybones' + Math.random() + '@koopakingdom.com'
				};
				agent
					.put('/users/' + user.id)
					.send(updatedUser)
					.end(cb);
			}
		], function(err, result) {
			if(err) {
				return done(err);
			}
			result.statusCode.should.equal(200);
			assertUserById(result.body.id, updatedUser, agent, done);
		});
	});

	it('Should require authentication to update a user', function(done) {
		request(url)
			.put('/users/' + user.id)
			.send(_.cloneDeep(userTemplate))
			.end( function(err, response) {
				if (err) {
					return done(err);
				}
				response.statusCode.should.equal(302);
				response.headers.location.should.equal('/login');
				done();
		});
	});
});
