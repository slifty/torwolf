'use strict';

var userRepository = require('../repositories/user');

/**
 * Module dependencies.
 */
exports.login = function(req, res, next) {
	res.redirect('/');
};

exports.create = function(req, res, next) {
	userRepository.create(req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		return res.json(user);
	});
};

exports.update = function(req, res, next) {
	userRepository.update(req.body, req.path.id, function(err, user) {
		if (err) {
			return next(err);
		}
		return res.json(user);
	})
}
