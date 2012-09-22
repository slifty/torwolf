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

function handleMessage(data, socket) {
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
				processAction(actionPieces[2], socket);
				break;
			case 'msg':
				processMsg(actionPieces[2], socket);
				break;
			case 'nick':
				processNick(actionPieces[2], socket);
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

function handleJoin(data, socket) {
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

function handleLeave(data, socket) {
}

/*

Input: 	action - The IRC /me to be performed
		game - This IRC session's game
		user - The user initiating the /me
		
Creates and sends a message to all clients in the game that the action has been performed

*/

function processAction(action, socket) {	
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = exports.getUserByPlayerId(player.id);
	var message = new classes.IrcMessage();

	message.text = action;
	message.type = constants.IRC_MESSAGE_TYPE_ACTION;
	message.user = user;
	sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcMessageOutPayload);
}

/*

Stub for handling personal messages.

*/

function processMsg(data, socket) {
	//data will include both target and the actual message - I think it should be parsed here, so the parameters for 
	//processing messages are more consistent.
	return;
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
		newNick - The nick that will attempt to be switched to
		user - The user initiating the nick change request
		

Attempts to change a user's nick. If it is successful, all clients will be notified of
the change. If it fails, only the client that initiated the change will be notified. 

Return: SUCCESS if successful, NICK_EXISTS if failure.

*/

function processNick(newNick, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = exports.getUserByPlayerId(player.id);
	
	if(getUserByNick(newNick) == null) {
		var message = new classes.IrcMessage();
		message.text = util.format(locales[game.locale].messages.irc.SWITCH_ALIAS, 
			users[user.player.id].alias, newNick);
		message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
		message.user = user;
		
		sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcMessageOutPayload);
			
		var message = new classes.IrcMessage();	
		message.type = constants.IRC_MESSAGE_TYPE_SWITCH_NICK;
		message.text = newNick;
		message.user = user;
		users[user.player.id].alias = newNick;
		sendMessage(message, communication.getSocketsByGameId(game.id), payloads.IrcAliasSwitchOutPayload);
	}
	else {
		var message = new classes.IrcMessage();
		message.text = util.format(locales[game.locale].messages.irc.ALIAS_EXISTS, newNick);
		message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
		message.user = user;
	
		sendMessage(message, communication.getSocketByPlayerId(user.player.id), payloads.IrcMessageOutPayload);
	}
	
	
}

/*
Input:	nick - A nick

Scans the users in this IRC instance; if a user is found with the given nick, it is returned. Otherwise, 
null is returned.

Return: A user if one exists with a certain nick in this IRC instance, else, null. 
*/

function getUserByNick(nick) {
	for(userId in users) {
		if(users[userId].alias === nick) {
			return users[userId];
		}
	}
	return null;
}

// Exports
exports.getUserByPlayerId = function(playerId) {
	return (playerId in users)?users[playerId]:null;
}

exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_IRC_PAYLOAD_MESSAGE:
			handleMessage(payload.data, socket);
			break;
		case constants.COMMUNICATION_IRC_PAYLOAD_JOIN:
			handleJoin(payload.data, socket);
			break;
		case constants.COMMUNICATION_IRC_PAYLOAD_LEAVE:
			handleLeave(payload.data, socket);
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
