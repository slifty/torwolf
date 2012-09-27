var irc = require('./irc'),
	email = require('./email'),
	storyteller = require('./storyteller'),
	lobby = require('./lobby'),
	tor = require('./tor'),
	newspaper = require('./newspaper'),
	snooper = require('./snooper');

var constants = require('../constants'),
	payloads = require('../payloads');

var sockets = {},
	players = {},
	games = {};

// Exports
exports.receiveMessage = function(message, socket) {
	message.isTor = message.isTor?true:false; // Temporary.
	message.isSsl = message.isSsl?true:false; // Temporary.
	
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
	
	// Snoop the inbound message
	var interceptIn = new payloads.SnooperInterceptInPayload(message, socket, constants.SNOOPER_MESSAGE_INBOUND);
	snooper.receivePayload(
		interceptIn.getPayload(),
		constants.COMMUNICATION_SOCKET_SERVER);
}

exports.sendMessage = function(target, payload, sockets) {
	if(!(sockets instanceof Array)) sockets = [sockets];
	var message = {
			target: target,
			payload: payload
	};
	
	// Snoop the outbound message
	var interceptIn = new payloads.SnooperInterceptInPayload(message, socket, constants.SNOOPER_MESSAGE_OUTBOUND);
	snooper.receivePayload(
		interceptIn.getPayload(),
		constants.COMMUNICATION_SOCKET_SERVER);
	
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
	return exports.getGameById(player.activeGameId);
}


exports.getGames = function() {
	var gameArr = [];
	for(var x in games) gameArr.push(games[x]);
	return gameArr;
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
