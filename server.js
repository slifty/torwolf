'use strict';
/**
 * Module dependencies.
 */
var chalk = require('chalk'),
  config = require('./config'),
  database = require('./app/lib/database'),
  logger = require('./app/lib/logger').logger,
  passport = require('passport'),
  userRepository = require('./app/repositories/user'),
  LocalStrategy = require('passport-local'),
  constants = require('./constants'),
  router = require('./app/handlers/router'),
  messageSender = require('./app/handlers/messageSender'),
  payloads = require('./payloads'),
  messageTypes = require('./message-types');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Init the express application
var app = require('./config/express')();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// configure passport
passport.use(new LocalStrategy({
  usernameField: 'email'
  }, function(username, password, done) {
    userRepository.findByEmail(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
	socket.locale = constants.LOCALE_DEFAULT;

	var payload = new payloads.StorytellerHeartbeatOutPayload(0);
	messageSender.send(
		payload,
		messageTypes.STORYTELLER_HEARTBEATPING,
		socket);

	socket.on('locale', function (locale) {
		socket.locale = locale;
	});

	socket.on('message', function (payload) {
		logger.debug('Received message ' + JSON.stringify(payload));
		router.receiveMessage(payload, socket);
	});
});

// Start the app by listening on <port>
server = server.listen(config.port);

// Expose app
exports = module.exports = {
  app: app,
  server: server
}

// Logging initialization
logger.info('--');
logger.info(chalk.green(config.app.title + ' application started'));
logger.info(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
logger.info(chalk.green('Port:\t\t\t\t' + config.port));
logger.info('--');
