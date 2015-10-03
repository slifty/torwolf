/*

A message is a line of text in a conversation. It can be either a direct message, or a message in a chat room.

We will not be implementing API functionality for this model in V1, but we are leaving it here
to be expanded on later.

*/

var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var schema = {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
			len: [0, 255]
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		set: function (password) {
			var salt = bcrypt.genSaltSync(10);
			var hash = bcrypt.hashSync(password, salt);
			this.setDataValue('password', hash);
		},
		validate: {
			len: [0, 255]
		}
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			len: [0, 255]
		}
	}
};

var options = {
	underscored: true,
	tableName: 'user'
};

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("User", schema, options);
}