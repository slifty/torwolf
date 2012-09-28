var util = require('util');

var communication = require('./communication'),
	storyteller =  require('./storyteller');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');

var sslCounts = {},
	torCounts = {},
	wiretaps = {};

// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}


// Handlers
function handleIntercept(data, interaction) {
	var socket = interaction.socket;
	console.log("tesT");
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.snooper.INTERCEPT_SYSTEM, socket);
	
	console.log("tesT2");
	// An interaction has been intercepted and needs to be pushed to the appropriate players
	var interaction = communication.getInteractionById(data.interactionId);
	if(interaction == null)
		return; // This intercept isn't part of an interaction
	
	console.log("tesT3");
	var game = communication.getGameBySocketId(interaction.socket.id);
	if(game == null)
		return; // The user isn't in a game
	
	// Process the interception
	for(var x in game.players) {
		var player = game.players[x];
		interaction.isWiretap = (getWiretapsByPlayerId(game.players[x].id).indexOf(player.id) != -1);
		switch(player.role) {
			case constants.PLAYER_ROLE_SPY:
				switch(interaction.message.target) {
					case constants.COMMUNICATION_TARGET_EMAIL:
						processEmailInterception(interaction, player);
						break;
					case constants.COMMUNICATION_TARGET_IRC:
						processIrcInterception(interaction, player);
						break;
					case constants.COMMUNICATION_TARGET_TOR:
						processTorInterception(interaction, player);
						break;
					default:
						break;
				}
				
				// Process SSL Information
				if(interaction.isWiretap && interaction.isSsl) {
					var sslOut = new payloads.SnooperSslOutPayload(communication.getPlayerBySocketId(data.socketId), interaction.message.target);
					exports.sendPayload(
						sslOut.getPayload(),
						communication.getSocketByPlayerId(player.id));
				}
				break;
			default: 
				break;
		}
	}
}

function processEmailInterception(interaction, player) {
	/*
		{+} The agent can read the content of all emails.
		{+} The agent knows which email accounts a player is accessing.
		{-} ... unless the player is using SSL or Tor.
	*/
	switch(interaction.message.payload.type) {
		case constants.COMMUNICATION_EMAIL_PAYLOAD_REGISTER:
		case constants.COMMUNICATION_EMAIL_PAYLOAD_SEND:
			var interceptOut = new payloads.SnooperInterceptOutPayload(interaction, communication.getPlayerBySocketId(interaction.socket.id));
			if(interaction.isSsl || interaction.isTor)
				interceptOut.player = null;
			exports.sendPayload(
				interceptOut.getPayload(),
				communication.getSocketByPlayerId(player.id));			
			break;
		default:
			return;
	}
}

function processIrcInterception(interaction, player) {
	/*
		{*} The government knows when a person has taken an action on a service using SSL.
		{-} ... unless the person is using Tor.
	*/
	switch(interaction.message.payload.type) {
		case constants.COMMUNICATION_IRC_PAYLOAD_LEAVE:
		case constants.COMMUNICATION_IRC_PAYLOAD_JOIN:
		case constants.COMMUNICATION_IRC_PAYLOAD_MESSAGE:
			var interceptOut = new payloads.SnooperInterceptOutPayload(interaction, communication.getPlayerBySocketId(interaction.socket.id));
			if(interaction.isSsl || interaction.isTor)
				interceptOut.player = null;
			
			exports.sendPayload(
				interceptOut.getPayload(),
				communication.getSocketByPlayerId(player.id));
			break;
		default:
			return;
	}
}

function processTorInterception(interaction, player) {
	/*
		{+} The agent knows who has enabled Tor.
		{-} ... unless a player is using a private Tor bridge, in which case the agent know nothing.
		{*} ... unless the player is wiretapped, in which case the agent still knows the player is using Tor.
	*/
	switch(interaction.message.payload.type) {
		case constants.COMMUNICATION_TOR_PAYLOAD_BRIDGE:
			var torOut = new payloads.SnooperTorOutPayload(communication.getPlayerBySocketId(interaction.socket.id), constants.SNOOPER_TOR_DISABLED);
			if(interaction.isWiretap)
				torOut.status = constants.SNOOPER_TOR_ENABLED;
			exports.sendPayload(
				torOut.getPayload(),
				communication.getSocketByPlayerId(player.id));			
			break;
		case constants.COMMUNICATION_TOR_PAYLOAD_CONNECT:
			var torOut = new payloads.SnooperTorOutPayload(communication.getPlayerBySocketId(interaction.socket.id), constants.SNOOPER_TOR_ENABLED);
			exports.sendPayload(
				torOut.getPayload(),
				communication.getSocketByPlayerId(player.id));			
			break;
		case constants.COMMUNICATION_TOR_PAYLOAD_DISCONNECT:
			var torOut = new payloads.SnooperTorOutPayload(communication.getPlayerBySocketId(interaction.socket.id), constants.SNOOPER_TOR_DISABLED);
			exports.sendPayload(
				torOut.getPayload(),
				communication.getSocketByPlayerId(player.id));			
			break;
		default:
			return;
	}
}


function handleWiretap(data, interaction) {
	var socket = interaction.socket;
	var player = communication.getPlayerBySocketId(socket.id);
	var game = communication.getGameBySocketId(socket.id);
	
	if(player.role != constants.PLAYER_ROLE_SPY)
		return error(locales[socket.locale].errors.snooper.WIRETAP_ROLE, socket);
	var wiretaps = getWiretapsByPlayerId(player.id);
	if(wiretaps.length >= game.wiretapCount)
		return error(locales[socket.locale].errors.snooper.WIRETAP_MAX, socket);
	
	wiretaps.push(data.playerId);
	
	var wiretapOut = new payloads.SnooperWiretapOutPayload(communication.getPlayerById(data.playerId));
	exports.sendPayload(
		wiretapOut.getPayload(),
		socket);			
}


function getWiretapsByPlayerId(playerId) {
	return(playerId in wiretaps)?wiretaps[playerId]:[];
}

// Exports
exports.receivePayload = function(payload, interaction) {
	switch(payload.type) {
		case constants.COMMUNICATION_SNOOPER_PAYLOAD_INTERCEPT:
			handleIntercept(payload.data, interaction);
			break;
		case constants.COMMUNICATION_SNOOPER_PAYLOAD_SSL:
			handleSsl(payload.data, interaction);
			break;
		case constants.COMMUNICATION_SNOOPER_PAYLOAD_TOR:
			handleTor(payload.data, interaction);
			break;
		case constants.COMMUNICATION_SNOOPER_PAYLOAD_WIRETAP:
			handleWiretap(payload.data, interaction);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_SNOOPER,
		payload,
		sockets)
};
