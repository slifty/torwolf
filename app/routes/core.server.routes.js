'use strict';
var express = require('express');
var coreRouter = express.Router();
var core = require('../../app/controllers/core.server.controller');

module.exports = function(app) {
  // Root routing
  coreRouter.get('/', core.index);
  app.use('/', coreRouter);
};
