'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {});
};

exports.login = function(req, res, next) {
	res.redirect('/', {});
};