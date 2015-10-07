var gameRepository = require('../repositories/game');
var async = require('async');

/**
 * Module dependencies.
 */

exports.create = function(req, res, next) {
	'use strict';
	gameRepository.create(req.body, function(err, game) {
		if (err) {
			return next(err);
		}
		return res.json(game);
	});
};

exports.find = function(req, res, next) {
	'use strict';
	var options = {
		offset: req.query.offset || 0,
		limit: req.query.limit || 20,
		where: { }
	};
	if (req.query.name) {
		var queryString = '%' + req.query.name + '%';
		options.where.name = {
			$like: queryString
		};
	}
	if (req.query.phase) {
		var phases = req.query.phase.split(',');
		options.where.phase = {
			$in: phases
		};
	}

	async.parallel([
		function(cb) {
			gameRepository.find(options, cb);
		},
		function(cb) {
			gameRepository.count(options, cb);
		}
	], function(err, results) {
		if (err) {
			return next(err);
		}
		return res.json({
			start: parseInt(options.offset),
			totalCount: results[1],
			results: results[0]
		});
	});
};

exports.get = function(req, res, next) {
	'use strict';
	gameRepository.get(req.params.id, function(err, game) {
		if (err) {
			return next(err);
		}
		return res.json(game);
	});
};
