'use strict';
var controller = require('../controllers/user.server.controller');
var express = require('express');
var userRouter = express.Router();
var passport = require('passport');

var passportMiddleware = passport.authenticate('local', { failureRedirect: '/login' });

module.exports = function (app) {
	// user routing
	userRouter.post('/login', passportMiddleware, controller.login);
	userRouter.post('/', controller.create);
	userRouter.put('/:id', controller.update);
	app.use('/users', userRouter);
}