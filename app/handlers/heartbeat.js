var constants = require('../../constants'),
	payloads = require('../../payloads'),
	locales = require('../../locales'),
	error = require('./error'),
	messageSender = require('./messageSender'),
	gameRepository = require('../repositories/game'),
	messageTypes = require('../../message-types');

exports.handle = function(payload, interaction) {
	var socket = interaction.socket;
	var count = payload.data.count;
	var game = gameRepository.get(payload.data.gameId, function (err, game) {
		if (err) {
			throw err;
		}

		// Did the game end?
		if (game.phase === 'COMPLETED') {
			return;
		}

		// Start the next heartbeat
		return setTimeout(function() {
			var heartbeatPayload = new payloads.StorytellerHeartbeatOutPayload(++count);
			messageSender.send(
				heartbeatPayload.getPayload(),
				socket,
				interaction);
		}, constants.TICK_HEARTBEAT);
	});

};

