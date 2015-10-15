var Sequelize = require('sequelize'),
	constants = require('../../constants'),
	defaultRoles = {};
defaultRoles[constants.PLAYER_ROLE_CITIZEN_AGENT] = [];
defaultRoles[constants.PLAYER_ROLE_JOURNALIST] = [];
defaultRoles[constants.PLAYER_ROLE_AGENT] = [];
defaultRoles[constants.PLAYER_ROLE_CITIZEN_ACTIVIST] = [];
defaultRoles[constants.PLAYER_ROLE_CITIZEN_APATHETIC] = [];

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
	},
	roles: {
		type: Sequelize.HSTORE(),
		allowNull: false,
		defaultValue: defaultRoles
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
	Game.belongsToMany(User, {
		through: 'user_game'
	});
	return Game;
};
//#JSCOVERAGE_ENDIF
