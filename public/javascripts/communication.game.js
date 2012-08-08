// Object
var GameCommunication = Class.extend({
	playerId: "",
	playerName: "",
	turn: 0,
	games: {},
	activeGame: null,
	players: {},
	messages: [],
	
	init: function() {
		// Lobby
		var lobbyPane = $('<div />')
			.attr('id', 'game-lobby-pane')
			.addClass('lobby-pane')
			.addClass('lobby-page')
			.appendTo($("body"));
		this.lobbyPane = lobbyPane;
		
		var gameList = $('<ul />')
			.attr('id','game-game-list')
			.addClass('game-list')
			.appendTo(lobbyPane);
		this.gameList = gameList;
		
		var lobbyInputPane = $('<div />')
			.attr('id','game-lobby-input-pane')
			.addClass('input-pane')
			.appendTo(lobbyPane);
		this.lobbyInputPane = lobbyInputPane;
		
		var lobbyToolPane = $('<div />')
			.attr('id','game-lobby-tool-pane')
			.addClass('tool-pane')
			.appendTo(lobbyInputPane);
		this.lobbyToolPane = lobbyToolPane;
		
		var toolJoin = $('<div />')
			.attr('id','game-tool-join')
			.addClass('tool')
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				var game = self.activeGame;
				if(game == null)
					return;
				
				if(game.isPrivate)
					var password = prompt("This game is private.  What's the password?","");
				
				self.joinIn(game, password);
			})
			.appendTo(lobbyToolPane);
		this.toolJoin = toolJoin;
		
		var toolCreate = $('<div />')
			.attr('id','game-tool-create')
			.addClass('tool')
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				self.createPane.fadeIn(500);
			})
			.appendTo(lobbyToolPane);
		this.toolCreate = toolCreate;
		
		
		// Creation pane
		var createPane = $('<div />')
			.attr('id','game-create-pane')
			.addClass('modal')
			.hide()
			.appendTo(lobbyPane);
		this.createPane = createPane;
		
		var createPaneForm = $('<form />')
			.attr('id','game-create-pane-form')
			.appendTo(createPane);
		
		var createPaneInputs = $('<ul />')
			.appendTo(createPaneForm);
		
		var createPaneInputItem_name = $('<li />')
			.appendTo(createPaneInputs);
		var createPaneInputLabel_name = $('<label />')
			.attr('for', 'game-create-name')
			.text('Name:')
			.appendTo(createPaneInputItem_name);
		var createPaneInputField_name = $('<input />')
			.attr('id', 'game-create-name')
			.attr('type', 'text')
			.appendTo(createPaneInputItem_name);
		
		var createPaneInputItem_isPrivate = $('<li />')
			.appendTo(createPaneInputs);
		var createPaneInputLabel_isPrivate = $('<label />')
			.attr('for', 'game-create-isPrivate')
			.addClass('checkbox')
			.text('Private')
			.appendTo(createPaneInputItem_isPrivate);
		var createPaneInputField_isPrivate = $('<input />')
			.attr('id', 'game-create-isPrivate')
			.attr('type', 'checkbox')
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				if($(this).is(":checked"))
					createPaneInputItem_password.show();
				else
					createPaneInputItem_password.hide();
					
			})
			.appendTo(createPaneInputItem_isPrivate);

		var createPaneInputItem_password = $('<li />')
			.hide()
			.appendTo(createPaneInputs);
		var createPaneInputLabel_password = $('<label />')
			.attr('for', 'game-create-password')
			.text('Password:')
			.appendTo(createPaneInputItem_password);
		var createPaneInputField_password = $('<input />')
			.attr('id', 'game-create-password')
			.attr('name', 'game-create-password')
			.attr('type', 'text')
			.appendTo(createPaneInputItem_password);
			
		var createPaneInputItem_submit = $('<li />')
			.appendTo(createPaneInputs);
		var createPaneInputField_submit = $('<div />')
			.attr('id', 'game-create-submit')
			.addClass('button')
			.addClass('submit')
			.text("Create")
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				var game = new Game();
				game.name = createPaneInputField_name.val();	
				game.password = createPaneInputField_password.val();
				game.isPrivate = createPaneInputField_isPrivate.is(":checked");
				self.createIn(game);
			})
			.appendTo(createPaneInputItem_submit);
		
		
		// In-game console
		var controlPane = $('<div />')
			.attr('id','game-control-pane')
			.addClass('control-pane')
			.addClass('game-page')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		// Outputs
		var outputPane = $('<div />')
			.attr('id','game-output-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.outputPane = outputPane;
		
		var playerList = $('<ul />')
			.attr('id','game-player-list')
			.addClass('player-list')
			.appendTo(outputPane);
		this.playerList = playerList;
		
		// Inputs
		var inputPane = $('<div />')
			.attr('id','game-input-pane')
			.addClass('input-pane')
			.appendTo(controlPane);
		this.inputPane = inputPane;
		
		var toolPane = $('<div />')
			.attr('id','game-tool-pane')
			.addClass('tool-pane')
			.appendTo(controlPane);
		this.toolPane = toolPane;
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_GAME, payload);
	},
	
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_GAME_PAYLOAD_CONNECT:
				this.connectOut(payload.data);
				break;
			case COMMUNICATION_GAME_PAYLOAD_CREATE:
				this.createOut(payload.data);
				break;
			case COMMUNICATION_GAME_PAYLOAD_JOIN:
				this.joinOut(payload.data);
				break;
		}
	},
	
	
	joinIn: function(game, password) {
		var join = new GameJoinInPayload(game);
		join.password = password;
		this.sendPayload(join.getPayload());
	},
	
	joinOut: function(data) {
		var player = new Player();
		player.id = data.id;
		player.alive = data.alive;
		player.name = data.name;
		player.role = data.role;
		player.allegiance = data.allegiance;
		this.players[player.id] = player;
		
		if(player.id == this.playerId) {
			// This user just joined a game
			$(".lobby-page").hide();
			$(".game-page").show();
		}
		
		var output = $('<li />');
		output.attr('id','player-' + player.id);
		output.addClass('player');
		
		player.render(output);
		this.playerList.append(output);
	},
	
	
	connectIn: function(name) {
		var connect = new GameConnectInPayload(name);
		this.sendPayload(connect.getPayload());
	},
	
	connectOut: function(data) {
		this.playerId = data.id;
		this.playerName = data.name;
		$(".lobby-page").show();
		$(".game-page").hide();
	},
	
	
	createIn: function(game) {
		var create = new GameCreateInPayload(game);
		this.sendPayload(create.getPayload());
	},
	
	createOut: function(data) {
		var game = new Game();
		game.id = data.id;
		game.name = data.name;
		game.players = data.players;
		game.isPrivate = data.isPrivate;
		this.games[game.id] = game;
		
		var output = $('<li />')
			.attr('id','game-' + game.id)
			.addClass('game')
			.data('game-id', game.id)
			.bind('click', {context: this}, function(ev) {
				var self = ev.data.context;
				var $this = $(this);
				var gameId = $this.data('game-id');

				self.gameList.find(".active").removeClass("active");
				self.activeGame = self.getGameById(gameId);
				$this.addClass("active");
			})
			.appendTo(this.gameList);
		game.render(output);
	},
	
	
	getGameById: function(id) {
		if(id in this.games)
			return this.games[id];
		return null;
	},
	
	getPlayerById: function(id) {
		if(id in this.players)
			return this.players[id];
		return null;
	}
	
});

$(function() {
	window.GAME_COMMUNICATION = new GameCommunication();
	window.GAME_COMMUNICATION.connectIn("slifty");
	
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
	//window.COMMUNICATION.receiveMessage(test);
	
});