var gameState = require('../../lib/gameState'),
	messageSender = require('../messageSender'),
	classes = require('../../classes'),
	payloads = require('../../../payloads'),
	error = require('../error'),
	locales = require('../../../locales'),
	constants = require('../../../constants');

var disconnectFromIrcServer = function (socket, player) {
	var game = gameState.getGameById(player.activeGameId);
	var user = gameState.getIrcUserByPlayerId(player.id);


	// Give the player a disconnected message
	disconnectMessage = new classes.IrcMessage(locales[game.locale].messages.irc.DISCONNECTED,
												constants.IRC_MESSAGE_TYPE_SYSTEM,
												user);
	disconnectOut = new payloads.IrcMessageOutPayload(disconnectMessage);
	messageSender.send(
		disconnectOut.getPayload(),
		socket);
};

exports.handle = function(data, interaction) {
	var socket = interaction.socket;

	var player = gameState.getPlayerById(data.data.playerId);
	var game = gameState.getGameById(player.activeGameId);
	var user = new classes.IrcUser();

	// Announce this player
	var joinOut = new payloads.IrcLeaveOutPayload(user);
	messageSender.send(
		joinOut.getPayload(),
		gameState.getSocketsByGameId(game.id));

	disconnectFromIrcServer(socket, player);

	// Broadcast the leave
	var message = new classes.IrcMessage(locales[game.locale].messages.irc.LEFT,
										constants.IRC_MESSAGE_TYPE_LEAVE,
										user);
	var messageOut = new payloads.IrcMessageOutPayload(message);
	messageSender.send(
		messageOut.getPayload(),
		gameState.getSocketsByGameId(game.id));
};
