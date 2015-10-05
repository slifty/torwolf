var Sequelize = require('sequelize');

//#JSCOVERAGE_IF
var schema = {
	payload: {
		type: Sequelize.JSONB,
		allowNull: false
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false
	},
	dispatchedAt: {
		type: Sequelize.DATE,
		allowNull: false,
		field: 'dispatched_at'
	},
};

var options = {
	underscored: true,
	tableName: 'event',
	indexes: [{
    	name: 'dispatched_at_index',
    	method: 'BTREE',
    	fields: ['dispatched_at']
    }]
};

module.exports = function(sequelize, DataTypes) {
	var Event = sequelize.define('Event', schema, options);
	var Game = sequelize.import(__dirname + '/game');
	Event.belongsTo(Game);
	return Event;
};
//#JSCOVERAGE_ENDIF