var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

//#JSCOVERAGE_IF
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
	tableName: 'user',
	instanceMethods: {
	  verifyPassword: function(password) { return bcrypt.compareSync(password, this.password); }
	}
};

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("User", schema, options);
}
//#JSCOVERAGE_ENDIF