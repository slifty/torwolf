var uuid = require('node-uuid');

var constants = require('../constants'),
	communication = require('./communication');

var games = {};


// Classes
function Game () {
	this.id = uuid.v1();
	this.name = "";
	this.password = "";
	this.players = [];
	this.secretCount = 3;
	this.secrets = [];
	this.messages = [];
}

function Player () {
	this.id = uuid.v1();
	this.alive = true,
	this.name = "";
	this.role = "";
	this.allegiance = "";
	this.secrets = [];
}


// Payloads
function PayloadError(content) {
	this.content = content;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_ERROR,
			data: {
				content: this.content
			}
		}
	}
}

function PayloadJoin(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_JOIN,
			data: {
				id: player.id,
				alive: player.alive,
				name: player.name,
				role: constants.PLAYER_ROLE_UNKNOWN,
				allegiance: constants.PLAYER_ALLEGIANCE_UNKNOWN
			}
		}
	}
}


// Functions
function join(data, socket) {
	var player = new Player();
	player.name = data.name;
	if(!data.game in games) {
		var error = new PayloadError("The game you tried to join doesn't exist.");
		communication.sendPayload(error.getPayload(), constants.COMMUNICATION_TARGET_GAME, socket);
	}
	
	var game = games[data.game];
	game.players.push(player);
	communication.registerPlayer(player,socket);
	
	
	var sockets = [];
	for(var x in game.players)
		sockets.push(communication.getSocketByPlayer(player));
	var join = new PayloadJoin(player);
	communication.sendPayload(join.getPayload(), constants.COMMUNICATION_TARGET_GAME , sockets);
}

function ready(data, socket) {
}

function startGame() {
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(message.type) {
		case constants.COMMUNICATION_GAME_PAYLOAD_LISTGAMES:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_JOIN:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_LEAVE:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_READY:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_SETROLE:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_SETALLEGIANCE:
			break;
	}
};

