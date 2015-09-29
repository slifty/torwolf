'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs'),
  http = require('http'),
  https = require('https'),
  express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  path = require('path'),
  config = require('../config'),
  logging = require('../app/lib/logger');

var logger = logging.expressLogger;

module.exports = function(db) {
  // Initialize express app
  var app = express();

  // Passing the request url to environment locals
  app.use(function(req, res, next) {
    res.locals.url = req.protocol + '://' + req.headers.host + req.url;
    next();
  });

  // Showing stack errors
  app.set('showStackError', true);

  // Set views path and view engine
  app.set('view engine', 'jade');
  app.set('views', './app/views');

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(logger);

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));

  // CookieParser should be above session
  app.use(cookieParser());

  // Globbing routing files
  config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });

  // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    logger.error(err.stack);

    // Error page
    res.status(500).render('500', {
      error: err.stack
    });
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not Found'
    });
  });


  // Return Express server instance
  return app;
};
