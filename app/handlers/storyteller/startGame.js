var async = require('async'),
	gameRepository = require('../../repositories/game'),
	gameState = require('../../lib/gameState'),
	messageSender = require('../messageSender'),
	payloads = require('../../../payloads'),
	classes = require('../../classes'),
	constants = require('../../../constants'),
	logger = require('../../lib/logger').logger,
	_ = require('lodash');

exports.handle = function(payload, interaction) {
	var socket = interaction.socket;
	async.waterfall([
		function(callback) {
			gameRepository.get(payload.data.gameId, callback);
		},
		function(game, callback) {
			// Assign information to the players
			var roles = [
				constants.PLAYER_ROLE_ACTIVIST,
				constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
				constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
				constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
				constants.PLAYER_ROLE_CITIZEN_APATHETIC,
				constants.PLAYER_ROLE_JOURNALIST,
				constants.PLAYER_ROLE_AGENT,
				constants.PLAYER_ROLE_CITIZEN_AGENT
			];

			var gameStateGame = gameState.getGameById(game.id);
			for(var x in gameStateGame.players) {
				var player = gameStateGame.players[x];

				// Assign a "random" role
				var role = roles.pop();
				player.role = role;
				gameState.assignRole(game.id, player.id, role);

				// Tell the player his role
				var roleOut = new payloads.StorytellerRoleOutPayload(player);
				messageSender.send(
					roleOut.getPayload(),
					gameState.getSocketByPlayerId(player.id));

				switch(player.role) {
					case constants.PLAYER_ROLE_ACTIVIST:
					case constants.PLAYER_ROLE_CITIZEN_ACTIVIST:
						player.allegiance = constants.PLAYER_ALLEGIANCE_REBELLION;
						break;
					case constants.PLAYER_ROLE_CITIZEN_APATHETIC:
					case constants.PLAYER_ROLE_JOURNALIST:
						player.allegiance = constants.PLAYER_ALLEGIANCE_NEUTRAL;
						break;
					case constants.PLAYER_ROLE_AGENT:
					case constants.PLAYER_ROLE_CITIZEN_AGENT:
						player.allegiance = constants.PLAYER_ALLEGIANCE_GOVERNMENT;
						break;
				}

				var allegianceOut = new payloads.StorytellerAllegianceOutPayload(player);
				messageSender.send(
					allegianceOut.getPayload(),
					gameState.getSocketByPlayerId(player.id));

				// Give the player his starting rumors
				var rumor = new classes.Rumor(game.id);
				rumor.destinationId = player.id;
				rumor.publicationStatus = constants.RUMOR_PUBLICATIONSTATUS_UNPUBLISHED;
				rumor.sourceId = constants.RUMOR_SOURCE_SYSTEM;
				rumor.truthStatus = undefined;
				if (player.role == constants.PLAYER_ROLE_ACTIVIST) {
					rumor.truthStatus = constants.RUMOR_TRUTHSTATUS_TRUE;
				} else {
					rumor.truthStatus = constants.RUMOR_TRUTHSTATUS_FALSE;
				}
				gameState.storeRumor(rumor);

				var rumorOut = new payloads.StorytellerRumorOutPayload(rumor);
				rumorOut.destinationId = player.id;
				rumorOut.sourceId = player.id;
				rumorOut.truthStatus = rumor.truthStatus;

				messageSender.send(
					rumorOut.getPayload(),
					gameState.getSocketByPlayerId(player.id));

				// TODO: agent
				//
				// if(player.role == constants.PLAYER_ROLE_SPY) {
				// 	snooper.sendPayload(
				// 		activateOut.getPayload(),
				// 		communication.getSocketByPlayerId(player.id));
				// }
			}

			// Start first turn
			var tickIn = new payloads.StorytellerTickInPayload(game, 1);

			messageSender.sendToServer(
				tickIn.getPayload());

			game.phase = 'STARTED';
			gameRepository.update(game, game.id, callback);
		}
	], function(err) {
		if (err) {
			logger.error(err);
		}
	});
};
