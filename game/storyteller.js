var util = require('util'),
	uuid = require('node-uuid');

var communication = require('./communication')
	newspaper = require('./newspaper');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');


// Functions
function end(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.storyteller.GAMEOVER_SYSTEM, socket);
	
	var game = communication.getGameById(data.gameId);
	
	// TODO - Reveal everyone's identity
	
	// That's all folks!
	var announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.GAMEOVER);
	exports.sendPayload(
		announcementOut.getPayload(),
		communication.getSocketsByGameId(game.id));
}

function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

function investigate(data, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	if(player == null)
		return error(locales[socket.locale].errors.storyteller.INVESTIGATE_NOPLAYER, socket);
	if(player.role != constants.PLAYER_ROLE_JOURNALIST)
		return error(locales[socket.locale].errors.storyteller.INVESTIGATE_NOJOURNALIST, socket);
	
	var game = communication.getGameById(player.activeGameId);
	if(game == null)
		return error(locales[socket.locale].errors.storyteller.INVESTIGATE_NOGAME, socket);
	
	var rumor = game.getRumorById(data.rumorId);
	if(rumor == null)
		return error(locales[socket.locale].errors.storyteller.INVESTIGATE_NORUMOR, socket);
	if(rumor.id in game.pastInvestigations)
		return error(locales[socket.locale].errors.storyteller.INVESTIGATE_OLDNEWS, socket);
	
	game.activeInvestigations = []; // For now we don't want to let you investigate more than one thing at a time
	game.activeInvestigations[rumor.id] = rumor;
}

function join(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.storyteller.JOIN_LOBBY, socket);
	
	var game = communication.getGameById(data.gameId);
	var player = communication.getPlayerById(data.playerId);
	var socket = communication.getSocketByPlayerId(player.id);
	
	// Tell the player who is in the game
	for(var x in game.players) {
		var joinOut = new payloads.StorytellerJoinOutPayload(game.players[x]);
		exports.sendPayload(
			joinOut.getPayload(),
			socket);
	}
	
	// Add the player to the game
	game.players[player.id] = player;
	player.activeGameId = game.id;

	// Announce the entrance of the player
	var join = new payloads.StorytellerJoinOutPayload(player);
	exports.sendPayload(
		join.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	// If the game is full, start the game
	if(Object.keys(game.players).length == game.roles.length) {
		var startOut = new payloads.StorytellerStartInPayload(game);
		exports.receivePayload(
			startOut.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	}
}

function start(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.storyteller.START_SYSTEM, socket);
	
	var game = communication.getGameById(data.gameId);
	var players = game.players;
	
	// Assign information to the players
	for(var x in players) {
		var player = players[x];
		
		// Assign a random role
		player.role = game.popRole();
		
		// Assign allegiance based on the role
		switch(player.role) {
			case constants.PLAYER_ROLE_ACTIVIST:
			case constants.PLAYER_ROLE_CITIZEN_ACTIVIST:
				player.allegiance = constants.PLAYER_ALLEGIANCE_REBELLION;
				break;
			case constants.PLAYER_ROLE_CITIZEN:
			case constants.PLAYER_ROLE_EDITOR:
			case constants.PLAYER_ROLE_JOURNALIST:
				player.allegiance = constants.PLAYER_ALLEGIANCE_NEUTRAL;
				break;
			case constants.PLAYER_ROLE_SPY:
			case constants.PLAYER_ROLE_CITIZEN_SPY:
				player.allegiance = constants.PLAYER_ALLEGIANCE_GOVERNMENT;
				break;
		}
		
		// Tell the player his role
		var roleOut = new payloads.StorytellerRoleOutPayload(player);
		exports.sendPayload(
			roleOut.getPayload(),
			communication.getSocketByPlayerId(player.id));
		
		// Tell the player his allegiance
		var allegianceOut = new payloads.StorytellerAllegianceOutPayload(player);
		exports.sendPayload(
			allegianceOut.getPayload(),
			communication.getSocketByPlayerId(player.id));
		
		// Give the player his starting rumors
		for(var x = 0; x < game.rumorCount; ++x) {
			var rumor = game.generateRumor();
			rumor.destinationId = player.id;
			rumor.publicationStatus = constants.RUMOR_PUBLICATIONSTATUS_UNPUBLISHED;
			rumor.sourceId = constants.RUMOR_SOURCE_SYSTEM;
			rumor.truthStatus = (player.role == constants.PLAYER_ROLE_ACTIVIST)?constants.RUMOR_TRUTHSTATUS_TRUE:constants.RUMOR_TRUTHSTATUS_FALSE;
			game.rumors[rumor.id] = rumor;
			player.rumors.push(rumor);
			
			var rumorOut = new payloads.StorytellerRumorOutPayload(rumor);
			rumorOut.sourceId = constants.RUMOR_SOURCE_SYSTEM;
			rumorOut.truthStatus = rumor.truthStatus;
			exports.sendPayload(
				rumorOut.getPayload(),
				communication.getSocketByPlayerId(player.id));
		}
	}
	
	// Start the next turn
	return setTimeout(function() {
		var heartbeatIn = new payloads.StorytellerHeartbeatInPayload(game);
		heartbeatIn.count = 0;
		
		exports.receivePayload(
			heartbeatIn.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	}, constants.TICK_HEARTBEAT);
}

function heartbeat(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.storyteller.HEARTBEAT_SYSTEM, socket);
	
	var count = data.count;
	var game = communication.getGameById(data.gameId);
	
	var heartbeatOut = new payloads.StorytellerHeartbeatOutPayload(count);
	exports.sendPayload(
		heartbeatOut.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	count += constants.TICK_HEARTBEAT;
	
	// Time for the next tick?
	if(count >= game.turnLength) {
		return setTimeout(function() {
			var tickIn = new payloads.StorytellerTickInPayload(game);
			tickIn.count = count;
			exports.receivePayload(
				tickIn.getPayload(),
				constants.COMMUNICATION_SOCKET_SERVER);
		}, constants.TICK_HEARTBEAT);
		return tick(game);
	}
	
	// Almost time for the next tick?
	var remainingTime = game.turnLength - count;
	if(remainingTime <= constants.TICK_WARNING
	&& remainingTime > constants.TICK_WARNING - constants.TICK_HEARTBEAT) {
		var announcementOut = new payloads.StorytellerAnnouncementOutPayload(
			util.format(locales[game.locale].messages.storyteller.WARNING,
				Math.floor(remainingTime / 1000),
				(Math.floor(remainingTime / 1000) == 1)?locales[game.locale].messages.storyteller.WARNING_UNIT_SINGULAR:locales[game.locale].messages.storyteller.WARNING_UNIT_PLURAL
			)
		);
		exports.sendPayload(
			announcementOut.getPayload(),
			communication.getSocketsByGameId(game.id));
	}
	
	// Start the next heartbeat
	return setTimeout(function() {
		var heartbeatIn = new payloads.StorytellerHeartbeatInPayload(game);
		heartbeatIn.count = count;
		exports.receivePayload(
			heartbeatIn.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	}, constants.TICK_HEARTBEAT);
}

function tick(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.storyteller.TICK_SYSTEM, socket);
	
	var game = communication.getGameById(data.gameId);
	
	// Announce the end of the turn
	var announcementOut = new payloads.StorytellerAnnouncementOutPayload(
		util.format(locales[game.locale].messages.storyteller.ROUND_END,
			game.round
		)
	);
	
	// Publish the newspaper
	if(Object.keys(game.activeInvestigations).length === 0) {
		var announcementOut = new payloads.StorytellerAnnouncementOutPayload(
			locales[game.locale].messages.storyteller.NEWS_NOTHING
		);
	} else {
		var announcementOut = new payloads.StorytellerAnnouncementOutPayload(
			locales[game.locale].messages.storyteller.NEWS_SOMETHING
		);
	}
	exports.sendPayload(
		announcementOut.getPayload(),
		communication.getSocketsByGameId(game.id));
	
	var publishIn = new payloads.NewspaperPublishInPayload(game);
	newspaper.receivePayload(
		publishIn.getPayload(),
		constants.COMMUNICATION_SOCKET_SERVER);
	
	// Reveal the rumors' truth
	for(var x in game.activeInvestigations) {
		var rumor = game.activeInvestigations[x];
		rumor.publicationStatus = constants.RUMOR_PUBLICATIONSTATUS_PUBLISHED;
		var rumorOut = new payloads.StorytellerRumorOutPayload(rumor);
		rumorOut.sourceId = constants.RUMOR_SOURCE_NEWSPAPER;
		rumorOut.truthStatus = rumor.truthStatus;
		exports.sendPayload(
			rumorOut.getPayload(),
			communication.getSocketsByGameId(game.id));
	}
	
	// Clear out the rumor mill
	for(var x in game.activeInvestigations) {
		game.processInvestigation(game.activeInvestigations[x].id);
	}
	
	// Check for activist victory
	var verifiedRumorCount = 0;
	for(var x in game.rumors) {
		if(game.rumors[x].publicationStatus == constants.RUMOR_PUBLICATIONSTATUS_PUBLISHED
		&& game.rumors[x].truthStatus == constants.RUMOR_TRUTHSTATUS_TRUE)
			verifiedRumorCount += 1;
	}
	if(verifiedRumorCount >= game.rumorCount) {
		var announcementOut = new payloads.StorytellerAnnouncementOutPayload(locales[game.locale].messages.storyteller.VICTORY_ACTIVISTS_MEDIA);
		exports.sendPayload(
			announcementOut.getPayload(),
			communication.getSocketsByGameId(game.id));
			
		var endIn = new payloads.StorytellerEndInPayload(game);
		
		return exports.receivePayload(
			heartbeatIn.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	}
	
	// Start the next turn
	game.round += 1;
	var tickOut = new payloads.StorytellerTickOutPayload(game);
	exports.sendPayload(
		tickOut.getPayload(),
		communication.getSocketsByGameId(game.id));

	return setTimeout(function() {
		var heartbeatIn = new payloads.StorytellerHeartbeatInPayload(game);
		heartbeatIn.count = 0;
		
		exports.receivePayload(
			heartbeatIn.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	}, constants.TICK_HEARTBEAT);
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_END:
			end(payload.data, socket);
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_HEARTBEAT:
			heartbeat(payload.data, socket);
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_INVESTIGATE:
			investigate(payload.data, socket);
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_JOIN:
			join(payload.data, socket);
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_LEAVE:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_READY:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_ROLE:
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_START:
			start(payload.data, socket);
			break;
		case constants.COMMUNICATION_STORYTELLER_PAYLOAD_TICK:
			tick(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_STORYTELLER,
		payload,
		sockets)
};

