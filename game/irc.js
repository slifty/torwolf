var util = require('util');

var communication = require('./communication');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');

var users = {};

// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

function broadcast(data, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = exports.getUserByPlayerId(player.id);
	
	var text = data.text;
	
	// Create an Action
	var message = new classes.IrcMessage();
	var actionPieces = text.match(/^\/([^ ]*) (.*)/);
	if(actionPieces !== null) {
		var action = actionPieces[1];
		switch(action) {
			case 'me':
				message.text = actionPieces[2];
				message.type = constants.IRC_MESSAGE_TYPE_ACTION;
				message.user = user;
				break;
			case 'msg':
				break;
			case 'nick':
				break;
			default:
				break;
		}
	} else {
		message.text = text;
		message.type = constants.IRC_MESSAGE_TYPE_BROADCAST;
		message.user = user;
	}
	
	// Clean the broadcast
	message.text = message.text.trim();
	if(message.text === '')
		return;
	
	// Send the broadcast
	var broadcastOut = new payloads.IrcBroadcastOutPayload(message);
	exports.sendPayload(
		broadcastOut.getPayload(),
		communication.getSocketsByGameId(game.id));
}

function join(data, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = new classes.IrcUser();
	
	user.alias = data.alias;
	user.player = player;
	
	// Announce this player
	var joinOut = new payloads.IrcJoinOutPayload(user);
	exports.sendPayload(
		joinOut.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	// Broadcast the join
	var message = new classes.IrcMessage();
	message.text = locales[game.locale].messages.irc.JOINED;
	message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	message.user = user;
	
	var broadcastOut = new payloads.IrcBroadcastOutPayload(message);
	exports.sendPayload(
		broadcastOut.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	// Tell the player who is already in the channel
	var players = game.players;
	for(var x in players) {
		if(players[x].id == player.id)
			continue;
		
		var joinOut = new payloads.IrcJoinOutPayload(user);
		exports.sendPayload(
			joinOut.getPayload(),
			socket);
	}
}

function leave(data, socket) {
}


// Exports
exports.getUserByPlayerId = function(playerId) {
	return (playerId in users)?users[playerId]:null;
}

exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_IRC_PAYLOAD_BROADCAST:
			broadcast(payload.data, socket);
			break;
		case constants.COMMUNICATION_IRC_PAYLOAD_JOIN:
			join(payload.data, socket);
			break;
		case constants.COMMUNICATION_IRC_PAYLOAD_LEAVE:
			leave(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_IRC,
		payload,
		sockets)
};
