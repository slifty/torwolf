var controller = require('../controllers/user.server.controller');
var express = require('express');
var userRouter = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function (app) {
	'use strict';
	// user routing
	userRouter.post('/', controller.create);
	userRouter.put('/:id', ensureLoggedIn('/login'), controller.update);
	userRouter.get('/:id', ensureLoggedIn('/login'), controller.get);
	app.use('/users', userRouter);
};