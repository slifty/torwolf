var Communication = Class.extend({
	pane: null,
	messages: [],
	
	init: function() {
		// Create a socket
		var socket = io.connect();
		socket.on('payload', this.receivePayload);
	},
	
	sendPayload: function(message) {
		socket.emit('payload', message);
	},
	
	receivePayload: function(message) {
		var communicationTarget = message.target;
		switch(message.target) {
			case COMMUNICATION_TARGET_IRC:
				window.IRC_COMMUNICATION.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_EMAIL:
				window.EMAIL_COMMUNICATION.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_GAME:
				window.GAME_COMMUNICATION.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_TOR:
				window.TOR_COMMUNICATION.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_NEWSPAPER:
				window.NEWSPAPER_COMMUNICATION.receivePayload(message.payload);
				break;
		}
	}
});

$(function() {
	window.COMMUNICATION = new Communication();
});