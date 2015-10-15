var constants = require('../../../constants'),
	payloads = require('../../../payloads'),
	locales = require('../../../locales'),
	error = require('../error'),
	messageSender = require('../messageSender'),
	gameRepository = require('../../repositories/game'),
	messageTypes = require('../../../message-types'),
	gameState = require('../../lib/gameState'),
	userRepository = require('../../repositories/user'),
	async = require('async'),
	logger = require('../../lib/logger').logger;

exports.handle = function(payload, interaction) {
	var socket = interaction.socket;
	async.parallel([
		function(cb) {
			gameRepository.get(payload.game.id, cb);
		},
		function(cb) {
			userRepository.get(payload.player.id, cb);
		}
	], function(error, results) {
		if (error) {
			throw error;
		}
		game = results[0];
		player = results[1];

		gameState.storeSocket(socket, payload.player.id);

		// Tell the player who is in the game
		for(var x in game.Users) {
			// TODO: replace with state replay
			var joinOut = new payloads.StorytellerJoinOutPayload(game.Users[x]);
			messageSender.send(
				joinOut,
				messageTypes.STORYTELLER_JOINED,
				socket,
				interaction);
		}

		// Add the player to the game
		game.addUser(player.id);
		gameRepository.update(game, game.id, function (err) {
			if (err) {
				throw err;
			}
			// Announce the entrance of the player
			var joinOut = new payloads.StorytellerJoinOutPayload(player);

			messageSender.send(
				joinOut,
				messageTypes.STORYTELLER_JOINED,
				gameState.getSocketsByGame(game)
			);

			// TODO: Have them join IRC
			// var joinIn = new payloads.IrcJoinInPayload(player.name);
			// communication.routeMessage(
			// 	constants.COMMUNICATION_TARGET_IRC,
			// 	joinIn.getPayload(),
			// 	socket);

			// If the game is full, start the game
			// FIXME: do not hard code length
			if(Object.keys(game.Users).length == 8) {
				var startOut = new payloads.StorytellerStartInPayload(game);
				messageSender.sendToServer(
					startOut,
					messageTypes.STORYTELLER_START);
			}
		});
	});
};
