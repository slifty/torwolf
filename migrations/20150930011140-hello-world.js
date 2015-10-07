'use strict';
var logger = require('../app/lib/logger').logger

module.exports = {
  up: function (queryInterface, Sequelize) {
    logger.info("Hello, world.");
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    logger.info("Goodbye, world.");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
