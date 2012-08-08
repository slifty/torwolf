var Communication = Class.extend({
	init: function() {
		// Create a socket
		this.socket = io.connect();
		this.socket.on('message', this.receiveMessage);
	},
	
	sendMessage: function(target, payload) {
		console.log("In:");
		console.log(payload);

		this.socket.emit('message', {
			target: target,
			payload: payload
		});
	},
	
	receiveMessage: function(message) {
		console.log("Out:");
		console.log(message);
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