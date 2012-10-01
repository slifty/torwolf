var util = require('util');

var communication = require('./communication'),
	snooper = require('./snooper'),
	storyteller =  require('./storyteller');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');

var accounts = {};

// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}


// Handlers
function handleRegister(data, interaction) {
	var socket = interaction.socket;

	// TODO -- clean the addresses and add a "domain" (e.g. @game123512313.torwolf.com)
	if(data.address.trim() == '')
		return error(locales[socket.locale].errors.email.ADDRESS_EMPTY, socket);
	if(exports.getAccountByAddress(data.address) != null)
		return error(locales[socket.locale].errors.email.ADDRESS_TAKEN, socket);
	
	var player = communication.getPlayerBySocketId(socket.id);
	var account = new classes.EmailAccount();
	account.address = data.address;
	account.player = player;
	accounts[account.address] = account;
	
	var registerOut = new payloads.EmailRegisterOutPayload(account);
	exports.sendPayload(
		registerOut.getPayload(),
		socket,
		interaction.id);
}

function handleSend(data, interaction) {
	var socket = interaction.socket;
	var sockets = [];
	
	var message = new classes.EmailMessage();
	message.body = data.body;
	message.subject = data.subject;
	message.from = exports.getAccountByAddress(data.fromAddress);
	for(var x in data.bccAddresses) {
		var account = exports.getAccountByAddress(data.bccAddresses[x]);
		if(account === null) {
			// TODO -- send a bounce notice
			continue;
		}
		message.bcc.push(account);
		sockets.push(communication.getSocketByPlayerId(account.player.id));
	}
	for(var x in data.ccAddresses) {
		var account = exports.getAccountByAddress(data.ccAddresses[x]);
		if(account === null) {
			// TODO -- send a bounce notice
			continue;
		}
		message.cc.push(account);
		sockets.push(communication.getSocketByPlayerId(account.player.id));
	}
	for(var x in data.toAddresses) {
		var account = exports.getAccountByAddress(data.toAddresses[x]);
		if(account === null) {
			// TODO -- send a bounce notice
			continue;
		}
		message.to.push(account);
		sockets.push(communication.getSocketByPlayerId(account.player.id));
	}
	
	// Distribute rumors
	for(var x in data.rumorIds) {
		var rumor = storyteller.getRumorById(data.rumorIds[x]);
		
		for(var y in sockets) {
			var destinationPlayer = communication.getPlayerBySocketId(sockets[y].id);
			var rumorIn = new payloads.StorytellerRumorInPayload(rumor);
			
			destinationPlayer.rumors[rumor.id] = rumor;
			rumorIn.sourceId = player.id;
			rumorIn.truthStatus = rumor.getPlayerTruthStatus(destinationPlayer);
			rumorIn.destinationId = destinationPlayer.id;
			
			communication.routeMessage(
				constants.COMMUNICATION_TARGET_STORYTELLER,
				rumorIn.getPayload(),
				constants.COMMUNICATION_SOCKET_SERVER);
		}
	}
	
	// Actually send the mail
	var sendOut = new payloads.EmailSendOutPayload(message);
	exports.sendPayload(
		sendOut.getPayload(),
		sockets,
		interaction.id);
}


// Exports
exports.getAccountByAddress = function(address) {
	return (address in accounts)?accounts[address]:null;
}

exports.receivePayload = function(payload, interaction) {
	switch(payload.type) {
		case constants.COMMUNICATION_EMAIL_PAYLOAD_REGISTER:
			handleRegister(payload.data, interaction);
			break;
		case constants.COMMUNICATION_EMAIL_PAYLOAD_SEND:
			handleSend(payload.data, interaction);
			break;
	}
};

exports.sendPayload = function(payload, sockets, interactionId) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_EMAIL,
		payload,
		sockets,
		interactionId)
};