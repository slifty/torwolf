var constants = require('../../constants'),
	payloads = require('../../payloads'),
	locales = require('../../locales'),
	error = require('./error'),
	messageSender = require('./messageSender'),
	gameRepository = require('../repositories/game'),
	messageTypes = require('../../message-types');

exports.handle = function(data, interaction) {
	var socket = interaction.socket;
	var count = data.count;
	var game = gameRepository.get(data.game.id, function (err, game) {
		if (err) {
			throw err;
		}

		// Did the game end?
		if (game.phase === 'COMPLETED') {
			return;
		}

		// Start the next heartbeat
		return setTimeout(function() {
			var payload = new payloads.StorytellerHeartbeatOutPayload(++count);
			messageSender.send(
				payload,
				messageTypes.STORYTELLER_HEARTBEATPING,
				socket,
				interaction);
		}, constants.TICK_HEARTBEAT);
	});

};

