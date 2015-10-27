var constants = require('../../../constants'),
	messageSender = require('../messageSender'),
	payloads = require('../../../payloads'),
	gameState = require('../../lib/gameState');

exports.handle = function(payload, interaction) {
	var round = payload.data.round;
	var game = {
		id: payload.data.gameId
	};

	// notify clients of next tick
	var thisTick = new payloads.StorytellerTickOutPayload();
	messageSender.send(
		thisTick.getPayload(),
		gameState.getSocketsByGame(game)
	);

	if (round === constants.TICK_IRCSUBPOENA) {
		var ircPayload = new payloads.StorytellerSubpoenaIrcInPayload(game);
		messageSender.sendToServer(
			ircPayload.getPayload()
		);
	}

	if (round === constants.TICK_EMAILSUBPOENA) {
		var emailPayload = new payloads.StorytellerSubpoenaEmailInPayload(game);
		messageSender.sendToServer(
			emailPayload.getPayload()
		);
	}

	// prepare for next tick
	setTimeout(function() {
		var nextTick = new payloads.StorytellerTickInPayload(game, ++round);
		messageSender.sendToServer(
			nextTick.getPayload());
	}, constants.TICK_LENGTH);
};
