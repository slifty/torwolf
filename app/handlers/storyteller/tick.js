var constants = require('../../../constants'),
	messageSender = require('../messageSender'),
	payloads = require('../../../payloads'),
	gameState = require('../../lib/gameState'),
	locales = require('../../../locales'),
	util = require('util');

exports.handle = function(payload, interaction) {
	var round = payload.data.round;
	var game = gameState.getGameById(payload.data.gameId);

	// notify clients of next tick
	var thisTick = new payloads.StorytellerTickOutPayload();
	messageSender.send(
		thisTick.getPayload(),
		gameState.getSocketsByGame(game)
	);

	// Announce the end of the turn
	var announcementOut = new payloads.StorytellerAnnouncementOutPayload(
		util.format(locales[game.locale].messages.storyteller.ROUND_END,
			game.round
		)
	);

	messageSender.send(
		announcementOut.getPayload(),
		gameState.getSocketsByGameId(game.id));

	// Publish the newspaper
	var publishAnnouncement = null;
	if(Object.keys(game.activeInvestigations).length === 0) {
		publishAnnouncement = new payloads.StorytellerAnnouncementOutPayload(
			locales[game.locale].messages.storyteller.NEWS_NOTHING
		);
	} else {
		publishAnnouncement = new payloads.StorytellerAnnouncementOutPayload(
			locales[game.locale].messages.storyteller.NEWS_SOMETHING
		);
	}
	messageSender.send(
		announcementOut.getPayload(),
		gameState.getSocketsByGameId(game.id));

	var publishIn = new payloads.NewspaperPublishInPayload(game);
	messageSender.sendToServer(publishIn.getPayload());

	// Reveal the rumors' truth
	for(var investigationIndex in game.activeInvestigations) {
		var rumor = game.activeInvestigations[investigationIndex];
		rumor.publicationStatus = constants.RUMOR_PUBLICATIONSTATUS_PUBLISHED;
		var rumorOut = new payloads.StorytellerRumorOutPayload(rumor);
		rumorOut.sourceId = constants.RUMOR_SOURCE_NEWSPAPER;
		rumorOut.truthStatus = rumor.truthStatus;
		messageSender.send(
			rumorOut.getPayload(),
			gameState.getSocketsByGameId(game.id));
	}

	// Clear out the rumor mill
	gameState.processInvestigations(game);

	// Check for activist victory
	var verifiedRumorCount = 0;
	for(var rumorIndex in game.rumors) {
		if(game.rumors[rumorIndex].publicationStatus == constants.RUMOR_PUBLICATIONSTATUS_PUBLISHED &&
			game.rumors[rumorIndex].truthStatus == constants.RUMOR_TRUTHSTATUS_TRUE)
			verifiedRumorCount += 1;
	}

	if(verifiedRumorCount >= game.rumorCount) {
		var activistsWonAnnouncement = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_ACTIVISTS_MEDIA);
		messageSender.send(
			activistsWonAnnouncement.getPayload(),
			gameState.getSocketsByGameId(game.id));

		var endIn = new payloads.StorytellerEndInPayload(game);
		messageSender.sendToServer(endIn.getPayload());
		return;
	}

	// Announce the beginning of the turn
	var startTurnAnnouncement = new payloads.StorytellerAnnouncementOutPayload(
		util.format(locales[game.locale].messages.storyteller.ROUND_BEGIN,
			game.round
		)
	);
	messageSender.send(
		startTurnAnnouncement.getPayload(),
		gameState.getSocketsByGameId(game.id));

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
