var Sequelize = require('sequelize');

var schema = {
	isPrivate: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		field: 'is_private'
	}
};

var options = {
	underscored: true,
	tableName: 'conversation'
};

module.exports = function(sequelize, DataTypes) {
	var Conversation = sequelize.define('Conversation', schema, options);
	var User = sequelize.import(__dirname + '/./user');
	var Lobby = sequelize.import(__dirname + '/./lobby');
	Conversation.belongsTo(Lobby, {
		through: 'user_lobby'
	});
	Conversation.belongsToMany(User, {
		through: 'user_conversation'
	});
	return Conversation;
}