var util = require('util');

var communication = require('./communication'),
	storyteller =  require('./storyteller');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');


// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

function handleMessage(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.snooper.SNOOP_SYSTEM, socket);
	
	// A message has been snooped and needs to be pushed to the appropriate players
	var game = communication.getGameBySocketId(data.socket.id);
	console.log("TEST");
	for(var x in game.players) {
		var player = game.players[x];
		if(player.role == constants.PLAYER_ROLE_SPY) {
			console.log("TEST2");
			var socket = communication.getSocketByPlayerId(player.id);
			var messageOut = new payloads.SnooperMessageOutPayload(data.target, data.payload);
			exports.sendPayload(
				messageOut.getPayload(),
				socket);
		}
	}
}

function handleWiretap(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.snooper.SNOOP_SYSTEM, socket);
	
	// A message has been snooped and needs to be pushed to the appropriate players
	var game = communication.getGameBySocketId(data.socket.id);
	for(var x in game.players) {
		var player = game.players[x];
		if(player.role == constants.PLAYER_ROLE_SPY) {
			var socket = communication.getSocketByPlayerId(player.id);
			var messageOut = new payloads.SnooperMessageOutPayload(data.target, data.payload);
			exports.sendPayload(
				messageOut.getPayload(),
				socket);
		}
	}
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_SNOOPER_PAYLOAD_MESSAGE:
			handleMessage(payload.data, socket);
			break;
		case constants.COMMUNICATION_SNOOPER_PAYLOAD_WIRETAP:
			handleWiretap(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_SNOOPER,
		payload,
		sockets)
};
