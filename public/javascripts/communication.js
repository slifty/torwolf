var COMMUNICATION_TARGET_IRC = "irc";
var COMMUNICATION_TARGET_EMAIL = "email";
var COMMUNICATION_TARGET_GAME = "";
var COMMUNICATION_TARGET_TOR = "";
var COMMUNICATION_TARGET_NEWSPAPER = "";

var Communication = Class.extend({
	pane: null,
	messages: [],
	
	init: function() {
		// Create a socket
	},
	
	sendPayload: function(message) {
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