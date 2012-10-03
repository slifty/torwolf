// Object
var Storyteller = Class.extend({
	
	init: function() {
		this.turn = 0;
		this.messages = [];
		this.players = {};
		this.rumors = {};
		this.you = null;
		
		
		// In-game console
		var controlPane = $('<div />')
			.attr('id','storyteller-control-pane')
			.addClass('control-pane')
			.addClass('incommunicado')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		// Outputs
		var playerPane = $('<div />')
			.attr('id','storyteller-player-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.playerPane = playerPane;
		
		var announcementPane = $('<div />')
			.attr('id','storyteller-announcement-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.announcementPane = announcementPane;
		
		var announcementList = $('<ul />')
			.attr('id','storyteller-announcement-list')
			.addClass('message-list')
			.appendTo(announcementPane);
		this.announcementList = announcementList;
		
		var peerPane = $('<div />')
			.attr('id','storyteller-peer-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.peerPane = peerPane;
		
		var header = $('<div />')
			.addClass('header')
			.appendTo(peerPane);
		var logo = $('<div />')
			.addClass("logo")
			.appendTo(header);
		var title = $('<h1 />')
			.text(localization[LOCALE].gui.storyteller.PLAYERS)
			.appendTo(header)
		
		var playerList = $('<ul />')
			.attr('id','storyteller-player-list')
			.addClass('player-list')
			.appendTo(peerPane);
		this.playerList = playerList;
		
		var rumorPane = $('<div />')
			.attr('id','storyteller-rumor-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.rumorPane = rumorPane;
		
		var header = $('<div />')
			.addClass('header')
			.appendTo(rumorPane);
		var logo = $('<div />')
			.addClass("logo")
			.appendTo(header);
		var title = $('<h1 />')
			.text(localization[LOCALE].gui.storyteller.RUMORS)
			.appendTo(header)
		
		var rumorList = $('<ul />')
			.attr('id','storyteller-rumor-list')
			.addClass('rumor-list')
			.appendTo(rumorPane);
		this.rumorList = rumorList;
		
	},
	
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE:
				this.allegianceOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_ANNOUNCEMENT:
				this.announcementOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_HEARTBEAT:
				this.heartbeatOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_JOIN:
				this.joinOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_ROLE:
				this.roleOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_RUMOR:
				this.rumorOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_START:
				this.startOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_TICK:
				this.tickOut(payload.data);
				break;
		}
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_STORYTELLER, payload);
	},
	
	
	allegianceOut: function(data) {
		var player = this.getPlayerById(data.playerId);
		player.allegiance = data.allegiance;
		player.redraw();
	},
	
	announcementOut: function(data) {
		var announcement = new StorytellerMessage();
		announcement.text = data.text;
		this.messages.push(announcement);
		
		var output = $('<li />')
			.appendTo(this.announcementList);
		
		var viewport = new Viewport(output, VIEWPORT_STORYTELLER_ANNOUNCEMENTPANE);
		announcement.render(viewport);
	},

	heartbeatOut: function(data) {
		// Todo - handle heartbeat announcements
	},
	
	investigateIn: function(rumorId) {
		var rumor = this.getRumorById(rumorId);
		
		// Reset investigation statuses
		for(var x in this.rumors) {
			this.rumors[x].investigationStatus = RUMOR_INVESTIGATIONSTATUS_NONE;
			this.rumors[x].redraw();
		}
		rumor.investigationStatus = RUMOR_INVESTIGATIONSTATUS_INVESTIGATING;
		rumor.redraw();
		
		var investigateIn = new StorytellerInvestigateInPayload(rumor);
		this.sendPayload(investigateIn.getPayload());
	},
	
	joinOut: function(data) {
		var player = new Player();
		player.id = data.playerId;
		player.status = data.status;
		player.name = data.name;
		player.role = data.role;
		player.allegiance = data.allegiance;
		this.players[player.id] = player;
		
		var output = $('<li />')
			.appendTo(this.playerList);
		
		var viewport = new Viewport(output, VIEWPORT_STORYTELLER_PEERPANE);
		player.render(viewport);
		
		if(player.id == COMMUNICATION.playerId) {
			this.you = player;
			var viewport = new Viewport(this.playerPane, VIEWPORT_STORYTELLER_PLAYERPANE);
			player.render(viewport);
		}
	},
	
	roleOut: function(data) {
		var player = this.getPlayerById(data.playerId);
		player.role = data.role;
		player.redraw();
	},
	
	rumorOut: function(data) {
		var rumor = this.getRumorById(data.rumorId);
		
		if(rumor == null) {
			rumor = new Rumor();
			rumor.id = data.rumorId;
			rumor.investigationStatus = RUMOR_INVESTIGATIONSTATUS_NONE;
			rumor.text = data.text;
			rumor.truthStatus = data.truthStatus;
			rumor.publicationStatus = data.publicationStatus;
			this.rumors[rumor.id] = rumor;
			
			var output = $('<li />')
			.appendTo(this.rumorList);
			
			var viewport = new Viewport(output, VIEWPORT_STORYTELLER_RUMORPANE);
			rumor.render(viewport);
		}
		
		var rumorTransfer = new RumorTransfer();
		rumorTransfer.rumor = rumor;
		rumorTransfer.source = this.getPlayerById(data.sourceId);
		rumorTransfer.destination = this.getPlayerById(data.destinationId);
		rumor.transfers.push(rumorTransfer);
		
		rumor.truthStatus = data.truthStatus;
		rumor.publicationStatus = data.publicationStatus;
		
		rumor.redraw();
	},
	
	startOut: function(data) {
	},

	tickOut: function(data) {
		console.log("Todo - handle tick announcements");
		
		// Reset investigation statuses
		for(var x in this.rumors) {
			this.rumors[x].investigationStatus = RUMOR_INVESTIGATIONSTATUS_NONE;
			this.rumors[x].redraw();
		}
		
	},
	
	
	getPlayerById: function(id) {
		return (id in this.players)?this.players[id]:null;
	},
	
	getRumorById: function(id) {
		return (id in this.rumors)?this.rumors[id]:null;
	}
	
});

$(function() {
	window.STORYTELLER = new Storyteller();
});