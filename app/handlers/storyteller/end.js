var gameState = require('../../lib/gameState'),
	payloads = require('../../../payloads'),
	locales = require('../../../locales'),
	messageSender = require('../messageSender');

exports.handle = function (data, interaction) {
	var game = gameState.getGameById(data.data.gameId);
	game.isOver = true;

	// TODO: update game
	// TODO - Reveal everyone's identity

	// That's all folks!
	var announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.GAMEOVER);
	messageSender.send(
		announcementOut.getPayload(),
		gameState.getSocketsByGameId(game.id));
};
