var Snooper = Class.extend({
	
	init: function() {
		this.messages = [];
		
		var controlPane = $('<div />')
			.attr('id','snooper-control-pane')
			.addClass('control-pane')
			.addClass('incommunicado-agent')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var messageList = $('<ul />')
			.attr('id','snooper-message-list')
			.addClass('messages')
			.appendTo(controlPane);
		this.eventList = eventList;
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_SNOOPER, payload);
	},
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_SNOOPER_PAYLOAD_MESSAGE:
				this.messageOut(payload.data);
				break;
			case COMMUNICATION_SNOOPER_PAYLOAD_WIRETAP:
				this.wiretapOut(payload.data);
				break;
		}
	},
	
	messageOut: function(data) {
		console.log("Got a snooped message!");
		console.log(data);
	},
	
	wiretapOut: function(data) {
	}
	
});

$(function() {
	window.SNOOPER = new Snooper();
});