var constants = require('../constants'),
	payloads = require('../payloads'),
	irc = require('./irc'),
	email = require('./email'),
	game = require('./game'),
	tor = require('./tor'),
	newspaper = require('./newspaper'),
	spy = require('./spy');

var sockets = {},
	players = {};

// Exports
exports.receiveMessage = function(message, socket) {
	console.log("In:");
	console.log(message);
	switch(message.target) {
		case constants.COMMUNICATION_TARGET_IRC:
			irc.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_EMAIL:
			email.receivePayload(message.payload, socket);
			break;
		case constants.COMMUNICATION_TARGET_GAME:
			game.receivePayload(message.payload, socket);
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
	console.log("Out:");
	console.log(payload);

	if(!(sockets instanceof Array)) sockets = [sockets];
	var message = {
			target: target,
			payload: payload
	};
	for(var x in sockets) {
		sockets[x].emit('message', message);
	}
}

exports.registerPlayer = function(player, socket) {
	sockets[player.id] = socket;
	players[socket.id] = player;
}

exports.getPlayerBySocketId = function(socketId) {
	return (socketId in players)?players[socketId]:null;
}

exports.getSocketByPlayerId = function(playerId) {
	return (playerId in sockets)?sockets[playerId]:null;
}