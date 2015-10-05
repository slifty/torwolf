var logger = require('./logger').logger;
var config = require('../../config');
var chalk = require('chalk');

if(!global.hasOwnProperty('database')) {
  var Sequelize = require('sequelize');
  var fs = require('fs');

  var sequelize = new Sequelize(
    config.sqlDatabase,
    config.sqlUser,
    config.sqlPassword, {
      host: config.sqlHost,
      port: config.sqlPort,
      logging: function (message) {
        logger.debug(message);
      },
      dialect: 'postgres',
      // underscore casing
      define: {
        underscored: true
      }
    });

  global.database = {
    sequelize: sequelize
  };

  sequelize
    .authenticate()
    .then(function() {
      logger.info('Connection has been established successfully.');
      var modelPath = __dirname + "/../models";
      fs.readdirSync(modelPath).forEach(function(file) {
        var name = file.substr(0, file.indexOf('.'));
        logger.info(chalk.green('Loading model ' + name));
        global.database[name] = sequelize.import(modelPath + "/" + name);
      });

      sequelize.sync();
    }, function (err) {
      logger.error('Unable to connect to the database:', err);
    });
}

module.exports = global.database;
