'use strict';
/**
 * Module dependencies.
 */
var chalk = require('chalk'),
  config = require('./config'),
  database = require('./app/lib/database'),
  logger = require('./app/lib/logger').logger;

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Init the express application
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
logger.info('--');
logger.info(chalk.green(config.app.title + ' application started'));
logger.info(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
logger.info(chalk.green('Port:\t\t\t\t' + config.port));
logger.info('--');