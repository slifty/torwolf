var uuid = require('node-uuid');

var constants = require('../constants');

exports.Game = function() {
	this.id = uuid.v4();
	this.isPrivate = false;
	this.messages = [];
	this.name = "";
	this.password = "";
	this.players = {};
	/*this.roles = [constants.PLAYER_ROLE_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_SPY,
		constants.PLAYER_ROLE_EDITOR,
		constants.PLAYER_ROLE_JOURNALIST,
		constants.PLAYER_ROLE_SPY];*/
	this.roles = [
		constants.PLAYER_ROLE_ACTIVIST,
		constants.PLAYER_ROLE_SPY
	];
	this.secretCount = 3;
	this.secrets = [];
	
	this.popRole = function() {
		if(this.roles.length == 0) return null;
		return this.roles.splice(Math.floor(Math.random() * this.roles.length), 1)[0];
	}
}

exports.Player = function() {
	this.status = constants.PLAYER_STATUS_ALIVE,
	this.allegiance = "";
	this.id = uuid.v4();
	this.name = "";
	this.role = "";
	this.secrets = [];
	this.activeGame = "";
}