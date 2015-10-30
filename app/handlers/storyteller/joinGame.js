var constants = require('../../../constants'),
	payloads = require('../../../payloads'),
	locales = require('../../../locales'),
	error = require('../error'),
	messageSender = require('../messageSender'),
	gameRepository = require('../../repositories/game'),
	gameState = require('../../lib/gameState'),
	userRepository = require('../../repositories/user'),
	async = require('async'),
	logger = require('../../lib/logger').logger;

exports.handle = function(payload, interaction) {
	var socket = interaction.socket;
	async.parallel([
		function(cb) {
			gameRepository.get(payload.data.gameId, cb);
		},
		function(cb) {
			userRepository.get(payload.data.playerId, cb);
		}
	], function(error, results) {
		if (error) {
			throw error;
		}
		var game = results[0];
		var player = results[1];

		if (!gameState.getGameById(game.id)) {
			gameState.storeGame(game);
		}

		// Tell the player who is in the game
		var joinOut = null;
		for(var x in gameState.getGameById(game.id).players) {
			// TODO: replace with state replay
			var otherPlayer = gameState.getGameById(game.id).players[x];
			joinOut = new payloads.StorytellerJoinOutPayload(otherPlayer);
			messageSender.send(
				joinOut.getPayload(),
				socket,
				interaction);
		}

		// Announce the entrance of the player
		joinOut = new payloads.StorytellerJoinOutPayload(player);

		messageSender.send(
			joinOut.getPayload(),
			gameState.getSocketsByGame(game)
		);

		gameState.storeSocket(socket, player.id);
		gameState.addPlayerToGame(game.id, player, socket);

		// FIXME: do not hard code length
		if(gameState.getGameById(game.id).players.length == 8) {
			var startOut = new payloads.StorytellerStartInPayload(game);
			messageSender.sendToServer(
				startOut.getPayload());
		}

		// TODO: Have them join IRC
		// var joinIn = new payloads.IrcJoinInPayload(player.name);
		// communication.routeMessage(
		// 	constants.COMMUNICATION_TARGET_IRC,
		// 	joinIn.getPayload(),
		// 	socket);
	});
};
