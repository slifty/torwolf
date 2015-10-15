var config = require('../../config');
var serverSocket = require('socket.io-client')(config.socketIoHost + ':' + config.socketIoPort);

exports.sendToServer = function(payload, type) {
	var message = {
		payload: payload,
		type: type
	};

	serverSocket.emit('message', message);
};

exports.send = function(payload, type, sockets, interaction) {
	if (!(sockets instanceof Array)) {
		sockets = [sockets];
	}

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

	for (var socket in sockets) {
		sockets[socket].emit('message', message);
	}
};
