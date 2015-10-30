var gameState = require('../../lib/gameState'),
	payloads = require('../../../payloads'),
	locales = require('../../../locales'),
	messageSender = require('../messageSender'),
	gameRepository = require('../../repositories/game'),
	logger = require('../../lib/logger').logger;

exports.handle = function (data, interaction) {
	var game = gameState.getGameById(data.data.gameId);
	game.phase = 'COMPLETED';
	gameRepository.update(game, game.id, function (err, game) {
		if (err) {
			logger.error(err);
		}
	});

	// That's all folks!
	var announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.GAMEOVER);
	messageSender.send(
		announcementOut.getPayload(),
		gameState.getSocketsByGameId(game.id));
};
