/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	'use strict';
	res.render('index', {});
};

exports.login = function(req, res, next) {
	res.redirect('/', {});
};
