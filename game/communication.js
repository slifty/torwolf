var constants = require('../constants'),
	irc = require('./irc'),
	email = require('./email'),
	game = require('./game'),
	tor = require('./tor'),
	newspaper = require('./newspaper'),
	spy = require('./spy');

var sockets = {},
	players = {};

// Exports
exports.receivePayload = function(message, socket) {
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

exports.sendPayload = function(message, target, sockets) {
	if(!(sockets instanceof Array)) sockets = [sockets];
	console.log("TODO: sendPayload");
}

exports.registerPlayer = function(player, socket) {
	sockets[player.id] = socket;
	players[socket.id] = player;
}

exports.getPlayerBySocket = function(socket) {
}
exports.getSocketByPlayer = function(player) {
}