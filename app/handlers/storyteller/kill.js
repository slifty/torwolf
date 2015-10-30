var gameState = require('../../lib/gameState'),
	error = require('../error'),
	locales = require('../../../locales'),
	messageSender = require('../messageSender'),
	constants = require('../../../constants'),
	payloads = require('../../../payloads');

exports.handle = function (data, interaction) {
	var socket = interaction.socket;
	var playerRole = gameState.getRoleByPlayerId(data.data.playerId);
	var killer = gameState.getPlayerBySocketId(socket.id);
	var killerRole = gameState.getRoleByPlayerId(data.data.playerId);
	var game = gameState.getGameById(data.data.gameId);

	if(!playerRole) {
		return error(locales[socket.locale].errors.storyteller.KILL_NOBODY, socket);
	}

	if(killerRole != constants.PLAYER_ROLE_AGENT) {
		return error(locales[socket.locale].errors.storyteller.KILL_ILLEGAL, socket);
	}

	var killOut = new payloads.StorytellerKillOutPayload({ id : data.data.playerId });
	messageSender.send(
		killOut.getPayload(),
		gameState.getSocketsByGameId(game.id));

	// Check victory conditions
	var endIn = null;
	var announcementOut = null;
	if(playerRole == constants.PLAYER_ROLE_ACTIVIST) {
		announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_GOVERNMENT_ACTIVIST);
		messageSender.send(
			announcementOut.getPayload(),
			gameState.getSocketsByGameId(game.id));

		endIn = new payloads.StorytellerEndInPayload(game);
		messageSender.sendToServer(endIn.getPayload());
	} else if(playerRole == constants.PLAYER_ROLE_JOURNALIST) {
		announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_GOVERNMENT_JOURNALIST);
		messageSender.send(
			announcementOut.getPayload(),
			gameState.getSocketsByGameId(game.id));

		endIn = new payloads.StorytellerEndInPayload(game);
		messageSender.routeMessage(endIn.getPayload());
	} else {
		announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_ACTIVISTS_KILLING);
		messageSender.send(
			announcementOut.getPayload(),
			gameState.getSocketsByGameId(game.id));

		endIn = new payloads.StorytellerEndInPayload(game);
		messageSender.sendToServer(endIn.getPayload());
	}
};
