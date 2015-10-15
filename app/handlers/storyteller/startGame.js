var async = require('async'),
	gameRepository = require('../../repositories/game'),
	gameState = require('../../lib/gameState'),
	messageSender = require('../messageSender'),
	messageTypes = require('../../../message-types'),
	payloads = require('../../../payloads'),
	classes = require('../../classes'),
	logger = require('../../lib/logger').logger,
	_ = require('lodash');

exports.handle = function(data, interaction) {
	var socket = interaction.socket;

	async.waterfall([
		function(callback) {
			gameRepository.get(data.gameId, callback);
		},
		function(game, callback) {
			// Assign information to the players
			var roles = _.cloneDeep(Object.keys(game.roles));
			for(var x in game.Users) {
				var player = game.Users[x];

				// Assign a "random" role
				// TODO: make sure roles are not double assigned
				var role = roles.pop();
				game.roles[role].push(player.id);

				// Tell the player his role
				var roleOut = new payloads.StorytellerRoleOutPayload(player);
				messageSender.send(
					roleOut.getPayload(),
					messageTypes.STORYTELLER_ROLESET,
					gameState.getSocketByPlayerId(player.id));

				// TODO: persist?
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
					allegianceOut,
					messageTypes.STORYTELLER_ALLEGIANCECHANGE,
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

				var rumorIn = new payloads.StorytellerRumorInPayload(rumor);
				rumorIn.destinationId = player.id;
				rumorIn.sourceId = player.id;
				rumorIn.truthStatus = rumor.truthStatus;

				messageSender.send(
					rumorIn,
					messageTypes.STORYTELLER_RUMOR,
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
			var tickIn = new payloads.StorytellerTickInPayload(game, 0);

			messageSender.sendToServer(
				tickIn,
				messageTypes.STORYTELLER_TICK);

			gameRepository.update(game, game.id, callback);
		}
	], function(err) {
		if (err) {
			logger.error(err);
		}
	});
};
