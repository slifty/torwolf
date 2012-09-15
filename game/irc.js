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
	var actionPieces = text.match(/^\/([^ ]*) (.*)/);
	if(actionPieces !== null) {
		var action = actionPieces[1];
		switch(action) {
			case 'me':
				performAction(actionPieces[2], game, user);
				break;
			case 'msg':
				break;
			case 'nick':
				switchAlias(game, actionPieces[2], user);
				break;
			default:
				break;
		}
	} else {
		var message = new classes.IrcMessage();
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
	user.alias = data.alias + player.id;

	// Announce this player
	var joinOut = new payloads.IrcJoinOutPayload(user);
	exports.sendPayload(
		joinOut.getPayload(),
		communication.getSocketsByGameId(game.id));

	// Give the player a connection message
	var connectMessage = new classes.IrcMessage();
	connectMessage.text = locales[game.locale].messages.irc.CONNECT;
	connectMessage.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	connectMessage.user = user;
	
	sendMessage(connectMessage, socket, payloads.IrcConnectOutPayload);
	
	// Broadcast the join
	var message = new classes.IrcMessage();
	message.text = util.format(locales[game.locale].messages.irc.JOINED, user.alias);
	message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	message.user = user;
	
	sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcMessageOutPayload);
	
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

/*

Input: 	action - The IRC /me to be performed
		game - This IRC session's game
		user - The user initiating the /me
		
Creates and sends a message to all clients in the game that the action has been performed

*/

function performAction(action, game, user) {
	var message = new classes.IrcMessage();
	message.text = action;
	message.type = constants.IRC_MESSAGE_TYPE_ACTION;
	message.user = user;
	sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcMessageOutPayload);
}

/*

Input:	message - The message to be sent.
		socketList - A list of the sockets over which to send the message.
		payloadFunction - The function that will create the payload.
		
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
Input:	game - This IRC instance's game
		newAlias - The alias that will attempt to be switched to
		user - The user initiating the alias change request
		

Attempts to change a user's alias. If it is successful, all clients will be notified of
the change. If it fails, only the client that initiated the change will be notified. 

Return: SUCCESS if successful, NICK_EXISTS if failure.

*/

function switchAlias(game, newAlias, user) {
	
	if(verifyAlias(newAlias) == constants.ALIAS_NOT_FOUND) {
		var message = new classes.IrcMessage();
		message.text = util.format(locales[game.locale].messages.irc.SWITCH_ALIAS, 
			users[user.player.id].alias, newAlias);
		message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
		message.user = user;
		
		sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcMessageOutPayload);
			
		var message = new classes.IrcMessage();	
		message.type = constants.IRC_MESSAGE_TYPE_SWITCH_NICK;
		message.text = newAlias;
		message.user = user;
		users[user.player.id].alias = newAlias;
		sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcAliasSwitchOutPayload);
	}
	else {
		var message = new classes.IrcMessage();
		message.text = util.format(locales[game.locale].messages.irc.ALIAS_EXISTS, newAlias);
		message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
		message.user = user;
	
		sendMessage(message, communication.getSocketByPlayerId(user.player.id), payloads.IrcMessageOutPayload);
	}
	
	
}

/*
Input:	alias - An alias

Scans the users in this IRC instance, to check if the alias already exists

Return: ALIAS_EXISTS if alias is not in this IRC channel, and ALIAS_NOT_FOUND if the alias is not found. 
*/

function verifyAlias(alias) {
	for(userId in users) {
		if(users[userId].alias === alias) {
			return constants.ALIAS_EXISTS;
		}
	}
	return constants.ALIAS_NOT_FOUND;
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
