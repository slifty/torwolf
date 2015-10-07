var Sequelize = require('sequelize');

//#JSCOVERAGE_IF
var schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false
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
		defaultValue: 'FORMING',
		allowNull: false
	},
	victor: {
		type: Sequelize.ENUM('REBELLION', 'GOVERNMENT')
	},
	createdAt: {
		type: Sequelize.DATE,
		field: 'created_at'
	},
	updatedAt: {
		type: Sequelize.DATE,
		field: 'updated_at'
	}
};

var options = {
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	underscored: true,
	timestamps: true,
	tableName: 'game',
	indexes: [{
		name: 'phase_index',
		method: 'BTREE',
		fields: ['phase']
	}, {
		name: 'name_index',
		method: 'BTREE',
		fields: ['name']
	}]
};

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.import(__dirname + '/user');
	var Game = sequelize.define('Game', schema, options);
	Game.hasMany(User);
	return Game;
};
//#JSCOVERAGE_ENDIF
