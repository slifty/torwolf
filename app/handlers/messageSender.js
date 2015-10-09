exports.send = function(payload, type, socket, interaction) {
	var message = {
		payload: payload,
		type: type
	};

	// Add to the interaction
	if(interaction) {
		interaction.responses.push(message);
		message.interactionId = interaction.id;
	}

	// TODO: Snoop the interaction
	if(interaction) {
		// var interceptIn = new payloads.SnooperInterceptInPayload(interaction);
		// exports.routeMessage(
		// 	constants.COMMUNICATION_TARGET_SNOOPER,
		// 	interceptIn.getPayload(),
		// 	constants.COMMUNICATION_SOCKET_SERVER);
	}

	socket.emit('message', message);
};
