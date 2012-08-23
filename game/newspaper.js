var util = require('util'),
	uuid = require('node-uuid');

var communication = require('./communication');

var constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');
	
var past_investigations = {},
	active_investigations = {};


// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

function publish(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.newspaper.PUBLISH_SYSTEM, socket);
	
	var game = communication.getGameById(data.gameId);
	var rumor = exports.getRumorByGameId(game.id);
	
	var publishOut = new payloads.NewspaperPublishOutPayload(rumor);
	if(rumor == constants.RUMOR_EMPTY) {
		publishOut.rumorId = constants.RUMOR_EMPTY;
		publishOut.headline = locales[game.locale].messages.newspaper.NO_HEADLINE;
		publishOut.copy = locales[game.locale].messages.newspaper.NO_COPY;
	} else {
		publishOut.rumorID = rumor.id;
		
		// Generate the article
		if(rumor.truthStatus == constants.RUMOR_TRUTHSTATUS_TRUE) {
			publishOut.headline = locales[game.locale].messages.newspaper.TRUE_HEADLINES[Math.floor(Math.random() * locales[game.locale].messages.newspaper.TRUE_HEADLINES.length)].format(rumor.text);
			publishOut.copy = locales[game.locale].messages.newspaper.TRUE_COPY[Math.floor(Math.random() * locales[game.locale].messages.newspaper.TRUE_COPY.length)].format(rumor.text);
		} else {
			publishOut.headline = locales[game.locale].messages.newspaper.FALSE_HEADLINES[Math.floor(Math.random() * locales[game.locale].messages.newspaper.FALSE_HEADLINES.length)].format(rumor.text);
			publishOut.copy = locales[game.locale].messages.newspaper.FALSE_COPY[Math.floor(Math.random() * locales[game.locale].messages.newspaper.FALSE_COPY.length)].format(rumor.text);
		}
	}
	
	// Announce the publication
	exports.sendPayload(
		publishOut.getPayload(),
		communication.getSocketsByGameId(game.id));
}

function investigate(data, socket) {
	var player = communication.getPlayerBySocketId(socket.id);
	if(player == null)
		return error(locales[socket.locale].errors.newspaper.INVESTIGATE_NOPLAYER, socket);
	if(player.role != constants.PLAYER_ROLE_JOURNALIST)
		return error(locales[socket.locale].errors.newspaper.INVESTIGATE_NOJOURNALIST, socket);
	
	var game = communication.getGameById(player.activeGameId);
	if(game == null)
		return error(locales[socket.locale].errors.newspaper.INVESTIGATE_NOGAME, socket);

	var rumor = game.getRumorById(data.rumorId);
	if(rumor == null)
		return error(locales[socket.locale].errors.newspaper.INVESTIGATE_NORUMOR, socket);
	if(rumor.id in past_investigations)
		return error(locales[socket.locale].errors.newspaper.INVESTIGATE_OLDNEWS, socket);
	
	active_investigations[data.gameId] = rumor;
}


// Exports
exports.getRumorByGameId = function(gameId) {
	return (gameId in active_investigations)?active_investigations[gameId]:constants.RUMOR_EMPTY;
}

exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_NEWSPAPER_PAYLOAD_INVESTIGATE:
			investigate(payload.data, socket);
			break;
		case constants.COMMUNICATION_NEWSPAPER_PAYLOAD_PUBLISH:
			publish(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_NEWSPAPER,
		payload,
		sockets)
};

