var Sequelize = require('sequelize');

//#JSCOVERAGE_IF
var schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	}
};

var options = {
	underscored: true,
	tableName: 'lobby'
};

module.exports = function (sequelize, DataTypes) {
	var Lobby = sequelize.define('Lobby', schema, options);
	var User = sequelize.import(__dirname + '/./user');
	Lobby.belongsToMany(User, {
		through: 'user_lobby'
	});
	return Lobby;
};
//#JSCOVERAGE_ENDIF