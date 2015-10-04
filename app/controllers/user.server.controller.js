'use strict';

var userRepository = require('../repositories/user');

/**
 * Module dependencies.
 */

exports.create = function(req, res, next) {
	userRepository.create(req.body, function(err, user) {
		if (err) {
			return next(err);
		}
		return res.json(user);
	});
};

exports.update = function(req, res, next) {
	userRepository.update(req.body, req.params.id, function(err, user) {
		if (err) {
			return next(err);
		}
		return res.json(user);
	})
}

exports.get = function(req, res, next) {
	userRepository.get(req.params.id, function(err, user) {
		if (err) {
			return next(err);
		}
		return res.json(user);
	})
}
