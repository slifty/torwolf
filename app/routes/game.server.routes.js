var controller = require('../controllers/game.server.controller');
var express = require('express');
var gameRouter = express.Router();
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function (app) {
	'use strict';
	// user routing
	gameRouter.post('/', ensureLoggedIn('/login'), controller.create);
	gameRouter.get('/:id', ensureLoggedIn('/login'), controller.get);
	gameRouter.get('/', ensureLoggedIn('/login'), controller.find);
	app.use('/games', gameRouter);
};
