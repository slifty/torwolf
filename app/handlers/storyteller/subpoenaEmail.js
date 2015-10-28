var messageSender = require('../messageSender'),
	gameState = require('../../lib/gameState'),
	payloads = require('../../../payloads');

exports.handle = function(payload, interaction) {
	outPayload = new payloads.StorytellerSubpoenaEmailOutPayload();
	messageSender.send(
		outPayload.getPayload(),
		gameState.getSocketsByGameId(payload.data.gameId));
};
