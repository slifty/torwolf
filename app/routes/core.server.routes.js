'use strict';
var express = require('express');
var coreRouter = express.Router();
var core = require('../../app/controllers/core.server.controller');

var passport = require('passport');
var passportMiddleware = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });

module.exports = function(app) {
  // Root routing
  coreRouter.get('/', core.index);
  coreRouter.get('/login', core.login);
  coreRouter.post('/login', passportMiddleware, core.index);
  app.use('/', coreRouter);
};
