var Snooper = Class.extend({
	
	init: function() {
		this.messages = [];
		
		var controlPane = $('<div />')
			.attr('id','snooper-control-pane')
			.addClass('control-pane')
			.addClass('incommunicado')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var messageList = $('<ul />')
			.attr('id','snooper-message-list')
			.addClass('messages')
			.appendTo(controlPane);
		this.messageList = messageList;
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_SNOOPER, payload);
	},
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_SNOOPER_PAYLOAD_INTERCEPT:
				this.interceptOut(payload.data);
				break;
			case COMMUNICATION_SNOOPER_PAYLOAD_SSL:
				this.sslOut(payload.data);
				break;
			case COMMUNICATION_SNOOPER_PAYLOAD_TOR:
				this.torOut(payload.data);
				break;
			case COMMUNICATION_SNOOPER_PAYLOAD_WIRETAP:
				this.wiretapOut(payload.data);
				break;
		}
	},
	
	interceptOut: function(data) {
		var interaction = new SnooperInteraction();
		interaction.id = data.interactionId;
		interaction.message = data.message;
		interaction.responses = data.responses;
		interaction.player = STORYTELLER.getPlayerById(data.playerId);
		
		this.messages.push(interaction);
		
		var output = $('<li />')
			.appendTo(this.messageList);
		
		var viewport = new Viewport(output, VIEWPORT_SNOOPER_MESSAGELIST);
		interaction.render(viewport);
		
		this.messageList.scrollTop(this.messageList.height());
	},
	
	sslOut: function(data) {
	},
	
	torOut: function(data) {
	},
	
	wiretapOut: function(data) {
	},
	
});

$(function() {
	window.SNOOPER = new Snooper();
});