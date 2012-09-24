var Communication = Class.extend({
	init: function() {
		// Create a socket
		this.socket = io.connect();
		this.socket.on('message', this.receiveMessage);
		this.playerId = "";
		this.playerName = "";
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
				window.IRC.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_EMAIL:
				window.EMAIL.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_STORYTELLER:
				window.STORYTELLER.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_LOBBY:
				window.LOBBY.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_SNOOPER:
				window.SNOOPER.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_TOR:
				window.TOR.receivePayload(message.payload);
				break;
			case COMMUNICATION_TARGET_NEWSPAPER:
				window.NEWSPAPER.receivePayload(message.payload);
				break;
		}
	},
	
	routeMessage: function(target, payload) {
		this.receiveMessage({
			target: target,
			payload: payload
		});
	}
});

$(function() {
	window.COMMUNICATION = new Communication();
});