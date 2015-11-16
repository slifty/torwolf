var gameState = require('../../lib/gameState'),
	messageSender = require('../messageSender'),
	classes = require('../../classes'),
	payloads = require('../../../payloads'),
	constants = require('../../../constants'),
	util = require('util'),
	locales = require('../../../locales'),
	error = require('../error');

// TODO: only send players to people in IRC
var processAction = function (action, interaction) {
	var socket = interaction.socket;
	var player = gameState.getPlayerBySocketId(socket.id);
	var game = gameState.getGameById(player.activeGameId);
	var user = gameState.getUserByPlayerId(player.id);
	var message = new classes.IrcMessage(action, constants.IRC_MESSAGE_TYPE_ACTION, user);

	var messageOut = new payloads.IrcMessageOutPayload(message);
	messageSender.send(
		messageOut.getPayload(),
		gameState.getSocketsByGameId(game.id),
		interaction);
};

var processNick = function (newNick, interaction) {
	var socket = interaction.socket;
	var player = gameState.getPlayerBySocketId(socket.id);
	var game = gameState.getGameById(player.activeGameId);
	var user = gameState.getUserByPlayerId(player.id);

	if(gameState.getUserByNick(newNick) === null) {

		//announce, in chat, that a nick has been switched
		var switchMessage = util.format(locales[game.locale].messages.irc.SWITCHNICK,
			user.nick, newNick);
		var message = new classes.IrcMessage(switchMessage, constants.IRC_MESSAGE_TYPE_SYSTEM, user);

		var messageOut = new payloads.IrcMessageOutPayload(message);
		messageSender.send(
			messageOut.getPayload(),
			communication.getSocketsByGameId(game.id));

		gameState.switchIrcUserNick(playerId, newNick);

		var nickOut = new payloads.IrcNickOutPayload(user);
		messageSender.send(
			nickOut.getPayload(),
			gameState.getSocketsByGameId(game.id),
			interaction);
	}
	else {
		//send an error message to the client
		var nickExistsMessage = util.format(locales[game.locale].errors.irc.NICKEXISTS, newNick);
		error(nickExistsMessage, gameState.getSocketByPlayerId(player.id));
	}
};

var processMsg = function (msg, interaction, target) {
	//TODO: remove the hard coding of the target
	var socket = interaction.socket;
	var player = gameState.getPlayerBySocketId(socket.id);
	var game = gameState.getGameById(player.activeGameId);
	var user = gameState.getUserByPlayerId(player.id);

	var message = new classes.IrcMessage(msg, constants.IRC_MESSAGE_TYPE_MESSAGE, user);

	var messageOut = new payloads.IrcMessageOutPayload(message);
	messageSender.send(
		messageOut.getPayload(),
		gameState.getSocketsByGameId(game.id),
		interaction);
};

exports.handle = function (data, interaction) {
	var socket = interaction.socket;
	data.text = data.text.trim();
	if(data.text === '') { return; }

	var player = gameState.getPlayerBySocketId(socket.id);
	var game = gameState.getGameById(player.activeGameId);

	var text = data.text;

	// Create an Action
	var actionPieces = text.match(/^\/([^ ]*) (.*)/);
	if(actionPieces !== null) {
		var action = actionPieces[1];
		switch(action) {
			case 'me':
				processAction(actionPieces[2], interaction);
				break;
			case 'msg':
				processMsg(actionPieces[2], interaction, null);
				break;
			case 'nick':
				processNick(actionPieces[2], interaction);
				break;
			default:
				break;
		}
	} else {
		processMsg(text, interaction, null);
	}
};
