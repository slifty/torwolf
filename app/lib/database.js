var logger = require('./logger').logger
var config = require('../../config')

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

  sequelize
    .authenticate()
    .then(function(err) {
      logger.info('Connection has been established successfully.');
    }, function (err) { 
      logger.error('Unable to connect to the database:', err);
    });

  global.database = {
    sequelize: sequelize
  };

  var modelPath = __dirname + "/../models";
  fs.readdirSync(modelPath).forEach(function(file) {
    var name = file.substr(0, file.indexOf('.'));
    global.database[name] = sequelize.import(modelPath + "/" + name);
  });

  sequelize.sync();
}

module.exports = global.database