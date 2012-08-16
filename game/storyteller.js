var uuid = require('node-uuid');

var communication = require('./communication');

var constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');


// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return communication.sendMessage(
		constants.COMMUNICATION_TARGET_STORYTELLER,
		error.getPayload(),
		socket);
}

function join(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.storyteller.JOIN_LOBBY, socket);
	
	var game = communication.getGameById(data.gameId);
	var player = communication.getPlayerById(data.playerId);
	var socket = communication.getSocketByPlayerId(player.id);
	
	// Tell the player who is in the game
	for(var x in game.players) {
		var join = new payloads.StorytellerJoinOutPayload(game.players[x]);
		exports.sendPayload(
			join.getPayload(),
			socket);
	}
	
	// Add the player to the game
	game.players[player.id] = player;

	// Announce the entrance of the player
	var join = new payloads.StorytellerJoinOutPayload(player);
	exports.sendPayload(
		join.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	// If the game is full, start the game
	if(Object.keys(game.players).length == game.roles.length) {
		var start = new payloads.StorytellerStartInPayload(game);
		exports.receivePayload(
			start.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	}
}

function start(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.storyteller.START_SYSTEM, socket);
	
	var game = communication.getGameById(data.gameId);
	var players = game.players;
	
	// Assign information to the players
	for(var x in players) {
		var player = players[x];
		
		// Assign a random role
		player.role = game.popRole();
		
		// Assign allegiance based on the role
		switch(player.role) {
			case constants.PLAYER_ROLE_ACTIVIST:
			case constants.PLAYER_ROLE_CITIZEN_ACTIVIST:
				player.allegiance = constants.PLAYER_ALLEGIANCE_REBELLION;
				break;
			case constants.PLAYER_ROLE_CITIZEN:
			case constants.PLAYER_ROLE_EDITOR:
			case constants.PLAYER_ROLE_JOURNALIST:
				player.allegiance = constants.PLAYER_ALLEGIANCE_NEUTRAL;
				break;
			case constants.PLAYER_ROLE_SPY:
			case constants.PLAYER_ROLE_CITIZEN_SPY:
				player.allegiance = constants.PLAYER_ALLEGIANCE_GOVERNMENT;
				break;
		}
		
		// Tell the player his role
		var role = new payloads.StorytellerRoleOutPayload(player);
		exports.sendPayload(
			role.getPayload(),
			communication.getSocketByPlayerId(player.id));
		
		// Tell the player his allegiance
		var allegiance = new payloads.StorytellerAllegianceOutPayload(player);
		exports.sendPayload(
			allegiance.getPayload(),
			communication.getSocketByPlayerId(player.id));
		
		// Announce the editor
		if(player.role == constants.PLAYER_ROLE_EDITOR) {
			exports.sendPayload(
				role.getPayload(),
				communication.getSocketsByGameId(game.id));
			
			exports.sendPayload(
				allegiance.getPayload(),
				communication.getSocketsByGameId(game.id));
		}
	}
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_JOIN:
			join(payload.data, socket);
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_LEAVE:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_READY:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_ROLE:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_START:
			start(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_STORYTELLER,
		payload,
		sockets)
};

