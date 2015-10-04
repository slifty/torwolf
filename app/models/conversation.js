/*

A conversation is a conversation in a pre-game lobby. 

It can involve two participants (a conversation of direct messages) or more (a chat room).

We will not be implementing API functionality for this model in V1, but we are leaving it here
to be expanded on later.

*/

var Sequelize = require('sequelize');

//#JSCOVERAGE_IF
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
//#JSCOVERAGE_ENDIF