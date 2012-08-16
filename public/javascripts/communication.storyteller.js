// Object
var GameCommunication = Class.extend({
	
	init: function() {
		this.turn = 0;
		this.players = {};
		this.messages = [];
		
		
		// In-game console
		var controlPane = $('<div />')
			.attr('id','storyteller-control-pane')
			.addClass('control-pane')
			.addClass('game-page')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		// Outputs
		var playerPane = $('<div />')
			.attr('id','storyteller-player-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.playerPane = playerPane;
		
		var peerPane = $('<div />')
			.attr('id','storyteller-peer-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.peerPane = peerPane;

		var playerList = $('<ul />')
			.attr('id','storyteller-player-list')
			.addClass('player-list')
			.appendTo(peerPane);
		this.playerList = playerList;
		
		var secretsPane = $('<div />')
			.attr('id','storyteller-secrets-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.secretsPane = secretsPane;
		
	},
	
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE:
				this.allegianceOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_ROLE:
				this.roleOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_JOIN:
				this.joinOut(payload.data);
				break;
			case COMMUNICATION_STORYTELLER_PAYLOAD_START:
				this.startOut(payload.data);
				break;
		}
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_GAME, payload);
	},
	
	
	allegianceOut: function(data) {
		var player = this.getPlayerById(data.playerId);
		player.allegiance = data.allegiance;
		player.redraw();
	},
	
	joinOut: function(data) {
		var player = new Player();
		player.id = data.playerId;
		player.alive = data.alive;
		player.name = data.name;
		player.role = data.role;
		player.allegiance = data.allegiance;
		this.players[player.id] = player;
		
		var output = $('<li />')
			.attr('id','player-' + player.id)
			.addClass('player')
			.appendTo(this.playerList);
		
		var viewport = new Viewport(output, VIEWPORT_PLAYER_STORYTELLER);
		player.render(viewport);
	},
	
	roleOut: function(data) {
		var player = this.getPlayerById(data.playerId);
		player.role = data.role;
		player.redraw();
	},
	
	startOut: function(data) {
	},
	
	
	getPlayerById: function(id) {
		if(id in this.players)
			return this.players[id];
		return null;
	}
	
});

$(function() {
	window.STORYTELLER_COMMUNICATION = new GameCommunication();
	
	// TEST
	var test = {
		target: COMMUNICATION_TARGET_STORYTELLER,
		payload: {
			type: COMMUNICATION_LOBBY_PAYLOAD_JOIN,
			data: {
				id: 1,
				alive: true,
				name: "player X",
				role: PLAYER_ROLE_UNKNOWN,
				allegiance: PLAYER_ALLEGIANCE_UNKNOWN
			}
		}
	}
	//window.COMMUNICATION.receiveMessage(test);
	
});