// exports.handle = function (data, interaction) {
// 	var socket = interaction.socket;
// 	var player = communication.getPlayerById(data.playerId);
// 	var killer = communication.getPlayerBySocketId(socket.id);
// 	var game = communication.getGameByPlayerId(player.id);

// 	if(player == null) {
// 		return error(locales[socket.locale].errors.storyteller.KILL_NOBODY, socket);
// 	}

// 	if(killer.role != constants.PLAYER_ROLE_SPY) {
// 		return error(locales[socket.locale].errors.storyteller.KILL_ILLEGAL, socket);
// 	}

// 	// Kill the player
// 	player.status = constants.PLAYER_STATUS_DEAD;

// 	var killOut = new payloads.StorytellerKillOutPayload(player);
// 	exports.sendPayload(
// 		killOut.getPayload(),
// 		communication.getSocketsByGameId(game.id));

// 	// Check victory conditions
// 	if(player.role == constants.PLAYER_ROLE_ACTIVIST) {
// 		var announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_GOVERNMENT_ACTIVIST);
// 		exports.sendPayload(
// 			announcementOut.getPayload(),
// 			communication.getSocketsByGameId(game.id));

// 		var endIn = new payloads.StorytellerEndInPayload(game);
// 		communication.routeMessage(
// 			constants.COMMUNICATION_TARGET_STORYTELLER,
// 			endIn.getPayload(),
// 			constants.COMMUNICATION_SOCKET_SERVER);

// 	} else if(player.role == constants.PLAYER_ROLE_JOURNALIST) {
// 		var announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_GOVERNMENT_JOURNALIST);
// 		exports.sendPayload(
// 			announcementOut.getPayload(),
// 			communication.getSocketsByGameId(game.id));

// 		var endIn = new payloads.StorytellerEndInPayload(game);
// 		communication.routeMessage(
// 			constants.COMMUNICATION_TARGET_STORYTELLER,
// 			endIn.getPayload(),
// 			constants.COMMUNICATION_SOCKET_SERVER);
// 	} else {
// 		var announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_ACTIVISTS_KILLING);
// 		exports.sendPayload(
// 			announcementOut.getPayload(),
// 			communication.getSocketsByGameId(game.id));

// 		var endIn = new payloads.StorytellerEndInPayload(game);
// 		communication.routeMessage(
// 			constants.COMMUNICATION_TARGET_STORYTELLER,
// 			endIn.getPayload(),
// 			constants.COMMUNICATION_SOCKET_SERVER);
// 	}
// }
