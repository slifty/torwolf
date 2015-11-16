var gameState = require('../../lib/gameState'),
	messageSender = require('../messageSender'),
	classes = require('../../classes'),
	payloads = require('../../../payloads'),
	error = require('../error'),
	locales = require('../../../locales'),
	constants = require('../../../constants');

var connectToIrcServer = function (socket, player) {
	var game = gameState.getGameById(player.activeGameId);
	var user = gameState.getIrcUserByPlayerId(player.id);

	// Give the player a connecting message
	var connectMessage = new classes.IrcMessage(locales[game.locale].messages.irc.CONNECTING,
												constants.IRC_MESSAGE_TYPE_SYSTEM,
												user);

	var connectOut = new payloads.IrcMessageOutPayload(connectMessage);
	messageSender.send(
		connectOut.getPayload(),
		socket);

	// Give the player a connected message
	connectMessage = new classes.IrcMessage(locales[game.locale].messages.irc.CONNECTED,
												constants.IRC_MESSAGE_TYPE_SYSTEM,
												user);
	connectOut = new payloads.IrcMessageOutPayload(connectMessage);
	messageSender.send(
		connectOut.getPayload(),
		socket);

	// Give the player a message of the day
	connectMessage = new classes.IrcMessage(locales[game.locale].messages.irc.MOTD,
												constants.IRC_MESSAGE_TYPE_SYSTEM,
												user);

	connectOut = new payloads.IrcMessageOutPayload(connectMessage);
	messageSender.send(
		connectOut.getPayload(),
		socket);
};

exports.handle = function(data, interaction) {
	var socket = interaction.socket;
	var player = gameState.getPlayerById(data.data.playerId);
	var game = gameState.getGameById(player.activeGameId);
	var user = new classes.IrcUser();

	user.player = player;
	player.nick = data.data.nick;
	user.nick = player.nick;
	gameState.addPlayerToIrc(player);

	// Announce this player
	var joinOut = new payloads.IrcJoinOutPayload(user);
	messageSender.send(
		joinOut.getPayload(),
		gameState.getSocketsByGameId(game.id));

	connectToIrcServer(socket, player);

	// Broadcast the join
	var message = new classes.IrcMessage(locales[game.locale].messages.irc.JOINED,
										constants.IRC_MESSAGE_TYPE_JOIN,
										user);
	var messageOut = new payloads.IrcMessageOutPayload(message);
	messageSender.send(
		messageOut.getPayload(),
		gameState.getSocketsByGameId(game.id));

	// Tell the player who is already in the channel
	var players = game.players;
	for(var playerId in players) {
		if(players[playerId].id == player.id) {
			continue;
		}

		joinOut = new payloads.IrcJoinOutPayload(user);
		messageSender.send(
			joinOut.getPayload(),
			socket);
	}
};
