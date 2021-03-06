var util = require('util');

var communication = require('./communication'),
	storyteller =  require('./storyteller');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');

var bridges = {};
var users = {};

// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

function handleBridge(data, interaction) {
	// TODO -- enable tor bridges
}

function handleDisconnect(data, interaction) {
	var socket = interaction.socket;
	var player = communication.getPlayerBySocketId(socket.id);
	delete users[player.id];
	
	// Let the player know he is disconnected
	var disconnectOut = new payloads.TorDisconnectOutPayload(player);
	exports.sendPayload(
		disconnectOut.getPayload(),
		socket);
}

function handleConnect(data, interaction) {
	var socket = interaction.socket;
	var player = communication.getPlayerBySocketId(socket.id);
	users[player.id] = player;
	
	// Let the player know he is connected
	var connectOut = new payloads.TorConnectOutPayload(player);
	exports.sendPayload(
		connectOut.getPayload(),
		socket);
}

function handleRoute(data, interaction) {
	var socket = interaction.socket;
	data.message.isTor = true; // Temporary
	communication.receiveMessage(data.message, socket); // Eventually we will want to use anonymization here, for now we will do that in line
	
	/*
	  So many modules need to be able to access players (e.g. email needs to be able to give players rumors / check if the player has a rumor / etc. )
	  Eventually we can create a TorPlayer object that provides access to all this, but strips out the identifying information, so we can ignore Tor logic outside of the Tor module
	  For now, modules will have Tor logic in them (e.g. "if the player isn't using Tor, tell the agent what happened")
	*/
}


// Exports
exports.getBridgeById = function(bridgeId) {
	return (bridgeId in bridges)?bridges[bridgeId]:null;
}

exports.getUserByPlayerId = function(playerId) {
	return (playerId in users)?users[playerId]:null;
}

exports.receivePayload = function(payload, interaction) {
	switch(payload.type) {
		case constants.COMMUNICATION_TOR_PAYLOAD_BRIDGE:
			handleBridge(payload.data, interaction);
			break;
		case constants.COMMUNICATION_TOR_PAYLOAD_CONNECT:
			handleConnect(payload.data, interaction);
			break;
		case constants.COMMUNICATION_TOR_PAYLOAD_DISCONNECT:
			handleDisconnect(payload.data, interaction);
			break;
		case constants.COMMUNICATION_TOR_PAYLOAD_ROUTE:
			handleRoute(payload.data, interaction);
			break;
	}
};

exports.sendPayload = function(payload, sockets, interactionId) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_TOR,
		payload,
		sockets,
		interactionId)
};
