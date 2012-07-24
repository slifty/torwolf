var GameCommunication = Communication.extend({
	turn: 0,
	players: [],
	
	init: function() {
		var controlPane = $('<div />');
		controlPane.attr('id','game-control-pane');
		controlPane.addClass('control-pane');
		this.controlPane = controlPane;
		$("body").append(controlPane);
		
		var outputPane = $('<div />');
		outputPane.attr('id','game-output-pane');
		outputPane.addClass('output-pane');
		this.outputPane = outputPane;
		controlPane.append(outputPane);
		
		var inputPane = $('<div />');
		inputPane.attr('id','game-input-pane');
		inputPane.addClass('input-pane');
		this.inputPane = inputPane;
		controlPane.append(inputPane);
		
		var toolPane = $('<div />');
		toolPane.attr('id','game-tool-pane');
		toolPane.addClass('tool-pane');
		this.toolPane = toolPane;
		controlPane.append(toolPane);
		
		var playerList = $('<ul />');
		playerList.attr('id','game-player-list');
		playerList.addClass('player-list');
		this.playerList = playerList;
		outputPane.append(playerList);
	},
	
	
	sendPayload: function(text) {
		console.log("TODO: Send Game Message");
	},
	
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_GAME_PAYLOAD_JOIN:
				this.join(payload.data);
				break;
		}
	},
	
	join: function(data) {
		var player = new Player();
		player.id = data.id;
		player.alive = data.alive;
		player.name = data.name;
		player.role = data.role;
		player.allegiance = data.allegiance;
		this.players.push(player);
		
		var output = $('<li />');
		output.attr('id','player-' + player.id);
		output.addClass('player');
		
		player.render(output);
		this.playerList.append(output);
	},
	
	getPlayerById: function(id) {
		for(var x in this.players) {
			if(this.players[x].id == id)
				return this.players[x];
		}
		return null;
	}
	
});

$(function() {
	window.GAME_COMMUNICATION = new GameCommunication();
	
	// TEST
	var test = {
		target: COMMUNICATION_TARGET_GAME,
		payload: {
			type: COMMUNICATION_GAME_PAYLOAD_JOIN,
			data: {
				id: 1,
				alive: true,
				name: "player X",
				role: PLAYER_ROLE_UNKNOWN,
				allegiance: PLAYER_ALLEGIANCE_UNKNOWN
			}
		}
	}
	window.COMMUNICATION.receivePayload(test);
	
});