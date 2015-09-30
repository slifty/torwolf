//#JSCOVERAGE_IF
var Sequelize = require('sequelize');

var schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	startedAt: {
		type: Sequelize.DATE,
		field: 'started_at'
	},
	completedAt: {
		type: Sequelize.DATE,
		field: 'completed_at'
	},
	phase: {
		type: Sequelize.ENUM('FORMING', 'STARTED', 'COMPLETED'),
		allowNull: false
	},
	victor: {
		type: Sequelize.ENUM('REBELLION', 'GOVERNMENT')
	}
};

var options = {
	underscored: true,
	tableName: 'game',
	indexes: [{
    	name: 'phase_index',
    	method: 'BTREE',
    	fields: ['phase']
    }]
};

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.import(__dirname + '/user');
	var Game = sequelize.define('Game', schema, options);
	Game.hasMany(User);
	return Game;
}
//#JSCOVERAGE_ENDIF