var classes = require('../classes'),
	constants = require('../../constants'),
	payloads = require('../../payloads'),
	gameState = require('../lib/gameState'),
	routingTable = require('./routingTable'),
	logger = require('../lib/logger').logger;

exports.receiveMessage = function(message, socket) {
	if(!message.payload || !message.type) {
		logger.info("Invalid payload received " + JSON.stringify(message));
		return; // Invalid payload
	}

	// Set up metadata about the message
	if(gameState.getInteractionById(message.interactionId)) {
		logger.info("Duplicate interaction received " + message.interactionId);
		return; // Duplicate interaction
	}
	// Build the interaction
	var interaction = new classes.Interaction();
	interaction.id = message.interactionId?message.interactionId:interaction.id;
	interaction.message = message;
	interaction.isTor = message.isTor?true:false;
	interaction.isSsl = message.isSsl?true:false;
	interaction.socket = socket;
	gameState.storeInteraction(interaction);
	message.interactionId = interaction.id;

	routingTable[message.type].handle(message.payload, interaction);
};
