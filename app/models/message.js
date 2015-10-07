var Sequelize = require('sequelize');

//#JSCOVERAGE_IF
var schema = {
	text: {
		type: Sequelize.TEXT,
		allowNull: false
	}
};

var options = {
	underscored: true,
	tableName: 'message'
};

module.exports = function (sequelize, DataTypes) {
	var Conversation = sequelize.import(__dirname + '/conversation');
	var Message = sequelize.define('Message', schema, options);
	Message.belongsTo(Conversation);
	return Message;
};

//#JSCOVERAGE_ENDIF