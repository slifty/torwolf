// Object
var Newspaper = Class.extend({
	
	init: function() {
		this.messages = [];
		
		
		// In-game console
		var controlPane = $('<div />')
			.attr('id','newspaper-control-pane')
			.addClass('control-pane')
			.addClass('incommunicado')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		// Outputs
		var archivePane = $('<div />')
			.attr('id','newspaper-archive-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.archivePane = archivePane;
		
		var editionList = $('<ul />')
			.attr('id','newspaper-edition-list')
			.addClass('edition-list')
			.appendTo(archivePane);
		this.editionList = editionList;
	},
	
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_NEWSPAPER_PAYLOAD_PUBLISH:
				this.publishOut(payload.data);
				break;
		}
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_NEWSPAPER, payload);
	},
	
	
	publishOut: function(data) {
		var edition = new NewspaperMessage();
		edition.id = data.editionId;
		edition.copy = data.copy;
		edition.headline = data.headline;
		edition.round = data.round;
		this.messages.push(edition);
		
		var output = $('<li />')
			.appendTo(this.editionList);
		
		var viewport = new Viewport(output, VIEWPORT_NEWSPAPER_ARCHIVEPANE);
		edition.render(viewport);
	}
	
});

$(function() {
	window.NEWSPAPER = new Newspaper();
});