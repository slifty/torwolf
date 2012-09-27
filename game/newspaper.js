var util = require('util'),
	uuid = require('node-uuid');

var communication = require('./communication');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');


// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

function handlePublish(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.newspaper.PUBLISH_SYSTEM, socket);
	
	var game = communication.getGameById(data.gameId);
	
	// Write the paper
	var edition = new classes.NewspaperEdition();
	edition.round = game.round;

	if(Object.keys(game.activeInvestigations).length == 0) {
		edition.headline = locales[game.locale].messages.newspaper.NO_HEADLINE;
		edition.copy = locales[game.locale].messages.newspaper.NO_COPY;
	} else {
		for(var x in game.activeInvestigations) {
			// Most of this is written so that eventually papers can contain multiple rumors.  Headlines / copy generation will need to be changed for that to happen, however.
			var rumor = game.activeInvestigations[x];
			edition.rumors.push(rumor);
			
			if(rumor.truthStatus == constants.RUMOR_TRUTHSTATUS_TRUE) {
				edition.headline = util.format(locales[game.locale].messages.newspaper.TRUE_HEADLINES[Math.floor(Math.random() * locales[game.locale].messages.newspaper.TRUE_HEADLINES.length)], rumor.text);
				edition.copy = util.format(locales[game.locale].messages.newspaper.TRUE_COPY[Math.floor(Math.random() * locales[game.locale].messages.newspaper.TRUE_COPY.length)], rumor.text);
			} else {
				edition.headline = util.format(locales[game.locale].messages.newspaper.FALSE_HEADLINES[Math.floor(Math.random() * locales[game.locale].messages.newspaper.FALSE_HEADLINES.length)], rumor.text);
				edition.copy = util.format(locales[game.locale].messages.newspaper.FALSE_COPY[Math.floor(Math.random() * locales[game.locale].messages.newspaper.FALSE_COPY.length)], rumor.text);
			}
		}
	}
	
	// Announce the paper
	var publishOut = new payloads.NewspaperPublishOutPayload(edition);
	exports.sendPayload(
		publishOut.getPayload(),
		communication.getSocketsByGameId(game.id));
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_NEWSPAPER_PAYLOAD_PUBLISH:
			handlePublish(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets, interactionId) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_NEWSPAPER,
		payload,
		sockets,
		interactionId)
};

