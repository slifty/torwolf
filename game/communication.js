var irc = require('./irc'),
	email = require('./email'),
	storyteller = require('./storyteller'),
	lobby = require('./lobby'),
	tor = require('./tor'),
	newspaper = require('./newspaper'),
	snooper = require('./snooper');

var classes = require('./classes'),
	constants = require('../constants'),
	payloads = require('../payloads');

var interactions = {},
	messagesIn = {},
	messagesOut = {},
	sockets = {},
	players = {},
	games = {};

// Exports
exports.receiveMessage = function(message, socket) {
	if(!message.payload || !message.payload.data)
		return; // Invalid payload
	
	// Set up metadata about the message
	if(exports.getInteractionById(message.payload.data._interactionId) != null)
		return; // Duplicate interaction
	
	// Build the interaction
	var interaction = new classes.Interaction();
	interaction.id = message.payload.data._interactionId?message.payload.data._interactionId:interaction.id;
	interaction.message = message;
	interaction.isTor = message.isTor?true:false;
	interaction.isSsl = message.isSsl?true:false;
	interaction.socket = socket;
	interactions[interaction.id] = interaction;
	
	// Route the message
	switch(message.target) {
		case constants.COMMUNICATION_TARGET_IRC:
			irc.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_EMAIL:
			email.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_STORYTELLER:
			storyteller.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_LOBBY:
			lobby.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_SNOOPER:
			snooper.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_TOR:
			tor.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_NEWSPAPER:
			newspaper.receivePayload(message.payload, socket);
			break;
	}
}

exports.sendMessage = function(target, payload, sockets) {
	if(!(sockets instanceof Array)) sockets = [sockets];
	var message = {
		target: target,
		payload: payload
	};
	
	// Add to the interaction
	var interaction = exports.getInteractionById(message.payload.data._interactionId)
	if(interaction != null)
		interaction.responses.push(message);
	
	// Snoop the interaction
	if(interaction != null) {
		var interceptIn = new payloads.SnooperInterceptInPayload(interaction);
		snooper.receivePayload(
			interceptIn.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	}
	
	for(var x in sockets) {
		sockets[x].emit('message', message);
	}
}

exports.registerPlayer = function(player, socket) {
	sockets[player.id] = socket;
	players[socket.id] = player;
}

exports.registerGame = function(game) {
	games[game.id] = game;
}

exports.getGameById = function(gameId) {
	return (gameId in games)?games[gameId]:null;
}

exports.getGameByPlayerId = function(playerId) {
	var player = exports.getPlayerById(playerId);
	return exports.getGameById(player.activeGameId);
}

exports.getGameBySocketId = function(socketId) {
	var player = exports.getPlayerBySocketId(socketId);
	return (player==null)?null:exports.getGameById(player.activeGameId);
}


exports.getGames = function() {
	var gameArr = [];
	for(var x in games) gameArr.push(games[x]);
	return gameArr;
}

exports.getInteractionById = function(interactionId) {
	return(interactionId in interactions)?interactions[interactionId]:null;
}

exports.getPlayerById = function(playerId) {
	var socket = exports.getSocketByPlayerId(playerId);
	if(socket == null) return null;
	return exports.getPlayerBySocketId(socket.id);
}

exports.getPlayerBySocketId = function(socketId) {
	return (socketId in players)?players[socketId]:null;
}

exports.getPlayers = function() {
	var playerArr = [];
	for(var x in players) playerArr.push(players[x]);
	return playerArr;
}

exports.getSocketByPlayerId = function(playerId) {
	return (playerId in sockets)?sockets[playerId]:null;
}

exports.getSocketById = function(socketId) {
	var player = exports.getPlayerBySocketId(socketId)
	return (player == null)?null:exports.getSocketByPlayerId(player.id);
}

exports.getSockets = function() {
	var socketArr = [];
	for(var x in sockets) socketArr.push(sockets[x]);
	return socketArr;
}

exports.getSocketsByGameId = function(gameId) {
	var game = exports.getGameById(gameId);
	if(game == null) return null;
	
	var sockets = [];
	for(var x in game.players)
		sockets.push(exports.getSocketByPlayerId(game.players[x].id));
	return sockets;
}
