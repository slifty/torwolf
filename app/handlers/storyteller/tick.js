var constants = require('../../../constants'),
	messageSender = require('../messageSender'),
	messageTypes = require('../../../message-types'),
	payloads = require('../../../payloads'),
	gameState = require('../../lib/gameState');

exports.handle = function(data, interaction) {
	var round = data.round;
	var game = data.game;

	// notify clients of next tick
	var thisTick = new payloads.StorytellerTickOutPayload();
	messageSender.send(
		thisTick,
		messageTypes.STORYTELLER_TOCK,
		gameState.getSocketsByGame(data.game)
	);

	if (round === constants.TICK_IRCSUBPOENA) {
		var payload = new payloads.StorytellerSubpoenaIrcInPayload(game);
		messageSender.sendToServer(
			payload,
			messageTypes.STORYTELLER_IRCSUBPOENA
		);
	}

	if (round === constants.TICK_EMAILSUBPOENA) {
		var payload = new payloads.StorytellerSubpoenaEmailInPayload(game);
		messageSender.sendToServer(
			payload,
			messageTypes.STORYTELLER_EMAILSUBPOENA
		);
	}

	// prepare for next tick
	setTimeout(function() {
		var nextTick = new payloads.StorytellerTickInPayload(game, ++round);
		messageSender.sendToServer(
			nextTick,
			messageTypes.STORYTELLER_TICK);
	}, constants.TICK_LENGTH);
};
