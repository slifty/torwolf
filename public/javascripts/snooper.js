var Snooper = Class.extend({
	
	init: function() {
		this.messages = [];
		
		var controlPane = $('<div />')
			.attr('id','snooper-control-pane')
			.addClass('control-pane')
			.hide()
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var header = $('<div />')
			.addClass('header')
			.appendTo(controlPane);
		var logo = $('<div />')
			.addClass("logo")
			.appendTo(header);
		var title = $('<h1 />')
			.text(localization[LOCALE].gui.snooper.SNOOPER)
			.appendTo(header)
		
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
			case COMMUNICATION_GENERAL_PAYLOAD_ACTIVATE:
				this.activateOut(payload.data);
				break;
			case COMMUNICATION_GENERAL_PAYLOAD_DEACTIVATE:
				this.deactivateOut(payload.data);
				break;
			case COMMUNICATION_GENERAL_PAYLOAD_ERROR:
				this.errorOut(payload.data);
				break;
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
	
	
	activateOut: function(data) {
		this.controlPane.show();
	},

	deactivateOut: function(data) {
		this.controlPane.hide();
	},

	errorOut: function(data) {
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