var gameState = require('../../lib/gameState'),
	payloads = require('../../../payloads'),
	error = require('../error'),
	messageSender = require('../messageSender'),
	locales = require('../../../payloads');

// TODO
exports.handle = function (data, interaction) {
	console.log(data);

	socket = communication.getSocketByPlayerId(data.sourceId);

	var rumor = gameState.getRumorById(data.rumorId);
	if(!rumor) {
		return error(locales[socket.locale].errors.storyteller.RUMOR_INVALID_RUMOR, socket);
	}

	var rumorOut = new payloads.StorytellerRumorOutPayload(rumor);
	rumorOut.sourceId = data.sourceId;
	rumorOut.truthStatus = data.truthStatus;

	socket = communication.getSocketByPlayerId(data.destinationId);
	messageSender.send(
		rumorOut.getPayload(),
		socket);
};
