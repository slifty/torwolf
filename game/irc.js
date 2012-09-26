var util = require('util');

var communication = require('./communication')
	snooper = require('./snooper');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');
	

var users = {};

// Functions
function error(message, socket) {
	message.type = constants.COMMUNICATION_IRC_PAYLOAD_ERROR;
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

// Handlers
function handleMessage(data, socket) {
	data.text = data.text.trim();
	if(data.text === '')
		return;

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
				processMsg(actionPieces[2], socket, null);
				break;
			case 'nick':
				processNick(actionPieces[2], socket);
				break;
			default:
				break;
		}
	} else {
		processMsg(text, socket, null);
	}
	
}

function handleJoin(data, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = new classes.IrcUser();
	
	user.player = player;
	users[player.id] = user;
	user.nick = data.nick + player.id;

	// Announce this player
	var joinOut = new payloads.IrcJoinOutPayload(user);
	exports.sendPayload(
		joinOut.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	connectToIrcServer(socket);
	
	// Broadcast the join
	var message = new classes.IrcMessage();
	message.text = util.format(locales[game.locale].messages.irc.JOINED, user.nick);
	message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	message.user = user;
	
	var broadcastJoinOut = new payloads.IrcMessageOutPayload(message);
	exports.sendPayload(
		broadcastJoinOut.getPayload(),
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

function handleLeave(data, socket) {
}

/*

Input: 	action - The IRC /me to be performed
		socket - The socket that originated the action 
		
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
	
	var actionOut = new payloads.IrcMessageOutPayload(message);
	exports.sendPayload(
		actionOut.getPayload(),
		communication.getSocketsByGameId(game.id));
}

/*

Input: 	data - The msg to be sent
		socket - The socket that originated the msg.
		target - The target that the msg is to be sent to, either a channel or a user.

Handle a msg. The target can be either a user, in the case of a /msg, or a channel, in the 
case of generic typing to a channel.

*/

function processMsg(msg, socket, target) {
	//TODO: remove the hard coding of the target
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = exports.getUserByPlayerId(player.id);
	
	var message = new classes.IrcMessage();
		message.text = msg;
		message.type = constants.IRC_MESSAGE_TYPE_MESSAGE;
		message.user = user;
		
	var messageOut = new payloads.IrcMessageOutPayload(message);
	exports.sendPayload(
		messageOut.getPayload(),
		communication.getSocketsByGameId(game.id));
}

/*
Input:	newNick - The nick that will attempt to be switched to
		socket - The socket that originated the nick change.
		

Attempts to change a user's nick. If it is successful, all clients will be notified of
the change. If it fails, only the client that initiated the change will be notified. 

*/

function processNick(newNick, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = exports.getUserByPlayerId(player.id);
	
	if(getUserByNick(newNick) == null) {
	
		//announce, in chat, that a nick has been switched
		var message = new classes.IrcMessage();
		message.text = util.format(locales[game.locale].messages.irc.SWITCHNICK, 
			users[user.player.id].nick, newNick);
		message.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
		message.user = user;
			
		var messageOut = new payloads.IrcMessageOutPayload(message);
		exports.sendPayload(
			messageOut.getPayload(),
			communication.getSocketsByGameId(game.id));	
		
		users[user.player.id].nick = newNick;
		
		var messageOut = new payloads.IrcNickOutPayload(user);
		exports.sendPayload(
			messageOut.getPayload(),
			communication.getSocketsByGameId(game.id));
	}
	else {
		//send an error message to the client
		var nickExistsMessage = new classes.IrcMessage();
		nickExistsMessage.text = util.format(locales[game.locale].errors.irc.NICKEXISTS, newNick);
		nickExistsMessage.type = constants.IRC_MESSAGE_TYPE_ERROR;
		nickExistsMessage.user = user;
		error(nickExistsMessage, communication.getSocketByPlayerId(user.player.id));		
	}
}

/*

Input: socket - The socket to send the connection messages to

Connects to an IRC server and displays the MOTD. Right now, it just dummies it and sends messages. 

*/

function connectToIrcServer(socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameById(player.activeGameId);
	var user = exports.getUserByPlayerId(player.id);
	
	// Give the player a connecting message
	var connectMessage = new classes.IrcMessage();
	connectMessage.text = locales[game.locale].messages.irc.CONNECTING;
	connectMessage.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	connectMessage.user = user;
	
	var connectOut = new payloads.IrcMessageOutPayload(connectMessage);
	exports.sendPayload(
		connectOut.getPayload(),
		socket);
		
	// Give the player a connected message
	var connectMessage = new classes.IrcMessage();
	connectMessage.text = locales[game.locale].messages.irc.CONNECTED;
	connectMessage.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	connectMessage.user = user;
	
	var connectOut = new payloads.IrcMessageOutPayload(connectMessage);
	exports.sendPayload(
		connectOut.getPayload(),
		socket);
		
	// Give the player a message of the day
	var connectMessage = new classes.IrcMessage();
	connectMessage.text = locales[game.locale].messages.irc.MOTD;
	connectMessage.type = constants.IRC_MESSAGE_TYPE_SYSTEM;
	connectMessage.user = user;
	
	var connectOut = new payloads.IrcMessageOutPayload(connectMessage);
	exports.sendPayload(
		connectOut.getPayload(),
		socket);
}

/*
Input:	nick - The nick that will be searched for in the users array.

Scans the users in this IRC instance; if a user is found with the given nick, it is returned. Otherwise, 
null is returned.

Return: A user if one exists with a certain nick in this IRC instance, else, null. 
*/

function getUserByNick(nick) {
	for(userId in users) {
		if(users[userId].nick === nick) {
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
