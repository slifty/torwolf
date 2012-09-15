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

function message(data, socket) {
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
				performAction(actionPieces[2], game, message, user);
				break;
			case 'msg':
				break;
			case 'nick':
				switchAlias(actionPieces[2], game, message, user);
				break;
			default:
				break;
		}
	} else {
		message.text = text;
		message.type = constants.IRC_MESSAGE_TYPE_MESSAGE;
		message.user = user;
		sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcMessageOutPayload);
	}
	
}

function join(data, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = new classes.IrcUser();
	
	user.player = player;
	users[player.id] = user;
	user.alias = data.alias +users.indexOf(player.id);

	// Announce this player
	var joinOut = new payloads.IrcJoinOutPayload(user);
	exports.sendPayload(
		joinOut.getPayload(),
		communication.getSocketsByGameId(game.id));

	// Give the player a connection message
	var connectMessage = new classes.IrcMessage();
	connectMessage.text = locales[game.locale].messages.irc.CONNECT;
	connectMessage.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	
	var connectMessageOut = new payloads.IrcConnectOutPayload(connectMessage, user);
		exports.sendPayload(
		connectMessageOut.getPayload(),
		socket);
	
	// Broadcast the join
	var message = new classes.IrcMessage();
	message.text = util.format(locales[game.locale].messages.irc.JOINED, user.alias);
	message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	message.user = user;
	
	var messageOut = new payloads.IrcMessageOutPayload(message);
	exports.sendPayload(
		messageOut.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	
	
	// Tell the player who is already in the channel
	var players = game.players;
	for(var playerId in players) {
		if(players[playerId].id == player.id)
			continue;
		
		var joinOut = new payloads.IrcJoinOutPayload(users[playerId]);
		exports.sendPayload(
			joinOut.getPayload(),
			socket);
	}

}

function leave(data, socket) {
}

function performAction(action, game, message, user) {
	message.text = action;
	message.type = constants.IRC_MESSAGE_TYPE_ACTION;
	message.user = user;
	
	sendMessage(message, communication.getSocketsByGameId(game.id));
}

/*

Input:	message - A handle to the message to be sent.
		socketList - A list of the sockets over which to send the message.
		
Trims a message and sends it over every socket in socketList.

Return: SUCCESS if successful.

*/

function sendMessage(message, socketList, payloadFunction) {
	// Clean the message
	message.text = message.text.trim();
	if(message.text === '')
		return;
	
	// Send the message
	var messageOut = new payloadFunction(message);
	exports.sendPayload(
		messageOut.getPayload(),
		socketList);
		
	return constants.SUCCESS;
}

/*
Input:	game - A handle to this IRC instance's game
		message - A handle to the message that will notify clients of the alias change

Attempts to change a user's alias. If it is successful, all clients will be notified of
the change. If it fails, only the client that initiated the change will be notified. 
message.txt will be set to the new alias, if it is valid, or otherwise, ALIAS_EXISTS.

Return: SUCCESS if successful, NICK_EXISTS if failure.

*/

function switchAlias(newAlias, game, message, user) {
	message.type = constants.IRC_MESSAGE_TYPE_SWITCH_NICK;
	message.user = user;
	
	if(verifyAlias(newAlias)) {
		
		var message = new classes.IrcMessage();
		message.text = util.format(locales[game.locale].messages.irc.SWITCH_ALIAS, 
			users[user.player.id].alias, newAlias);
		message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
		message.user = user;
	
		var messageOut = new payloads.IrcMessageOutPayload(message);
		exports.sendPayload(
			messageOut.getPayload(),
			communication.getSocketsByGameId(game.id));
			
		message.text = newAlias;
		users[user.player.id].alias = newAlias;
		sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcAliasSwitchOutPayload);
	}
	else {
		var message = new classes.IrcMessage();
		message.text = util.format(locales[game.locale].messages.irc.ALIAS_EXISTS, newAlias);
		message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
		message.user = user;
	
		var messageOut = new payloads.IrcMessageOutPayload(message);
		exports.sendPayload(
			messageOut.getPayload(),
			communication.getSocketByPlayerId(user.player.id));
			
	}
	
	
}

/*
Input:	alias - An alias, in the form of a string

Scans this IRC channel for a given alias

Return: ALIAS_EXISTS if alias is not in this IRC channel, and ALIAS_NOT_FOUND if the alias is not found. 
*/

function verifyAlias(alias) {
	//find if alias exists and return appropriately
	var doesAliasExist = constants.ALIAS_NOT_FOUND;
	console.log(users);
	
	for(userId in users) {
		if(users[userId].alias === alias) {
			return constants.ALIAS_EXISTS;
		}
	}
	return doesAliasExist;
}

// Exports
exports.getUserByPlayerId = function(playerId) {
	return (playerId in users)?users[playerId]:null;
}

exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_IRC_PAYLOAD_MESSAGE:
			message(payload.data, socket);
			break;
		case constants.COMMUNICATION_IRC_PAYLOAD_JOIN:
			join(payload.data, socket);
			break;
		case constants.COMMUNICATION_IRC_PAYLOAD_LEAVE:
			leave(payload.data, socket);
			break;
		default: 
			break;		
	
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_IRC,
		payload,
		sockets)
};
