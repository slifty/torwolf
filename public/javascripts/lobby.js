// Object
var Lobby = Class.extend({
	
	init: function() {
		this.games = {};
		this.activeGameId = "";
		
		var controlPane = $('<div />')
			.attr('id','lobby-control-pane')
			.addClass('control-pane')
			.addClass('lobby')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var header = $('<div />')
			.addClass('header')
			.appendTo(controlPane);
		var logo = $('<div />')
			.addClass("logo")
			.appendTo(header);
		var title = $('<h1 />')
			.text(localization[LOCALE].gui.lobby.LOBBY)
			.appendTo(header)
		
		var gameList = $('<ul />')
			.attr('id','lobby-game-list')
			.addClass('game-list')
			.appendTo(controlPane);
		this.gameList = gameList;
		
		var lobbyToolPane = $('<div />')
			.attr('id','lobby-tool-pane')
			.addClass('tool-pane')
			.appendTo(controlPane);
		this.lobbyToolPane = lobbyToolPane;
		
		var toolCreate = $('<div />')
			.attr('id','lobby-tool-create')
			.addClass('button')
			.text(localization[LOCALE].gui.lobby.CREATE)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				self.createPane.fadeIn(500);
			})
			.appendTo(lobbyToolPane);
		this.toolCreate = toolCreate;
		
		var toolJoin = $('<div />')
			.attr('id','lobby-tool-join')
			.addClass('button')
			.text(localization[LOCALE].gui.lobby.JOIN)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				var game = self.getGameById(self.activeGameId);
				if(game == null)
					return;
				
				if(game.isPrivate)
					var password = prompt(localization[LOCALE].gui.lobby.PASSWORD_PROMPT,"");
				
				self.joinIn(game, password);
			})
			.appendTo(lobbyToolPane);
		this.toolJoin = toolJoin;
		
		
		
		// Creation pane
		var createPane = $('<div />')
			.attr('id','lobby-game-create-pane')
			.addClass('modal')
			.hide()
			.appendTo(controlPane);
		this.createPane = createPane;
		
		var createPaneForm = $('<form />')
			.attr('id','lobby-game-create-pane-form')
			.appendTo(createPane);
		
		var createPaneInputs = $('<ul />')
			.appendTo(createPaneForm);
		
		var createPaneInputItem_name = $('<li />')
			.appendTo(createPaneInputs);
		var createPaneInputLabel_name = $('<label />')
			.attr('for', 'lobby-game-create-name')
			.text(localization[LOCALE].gui.lobby.create.NAME)
			.appendTo(createPaneInputItem_name);
		var createPaneInputField_name = $('<input />')
			.attr('id', 'lobby-game-create-name')
			.attr('type', 'text')
			.appendTo(createPaneInputItem_name);
		
		var createPaneInputItem_isPrivate = $('<li />')
			.appendTo(createPaneInputs);
		var createPaneInputLabel_isPrivate = $('<label />')
			.attr('for', 'lobby-game-create-isPrivate')
			.addClass('checkbox')
			.text(localization[LOCALE].gui.lobby.create.ISPRIVATE)
			.appendTo(createPaneInputItem_isPrivate);
		var createPaneInputField_isPrivate = $('<input />')
			.attr('id', 'lobby-game-create-isPrivate')
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
			.attr('for', 'lobby-game-create-password')
			.text(localization[LOCALE].gui.lobby.create.PASSWORD)
			.appendTo(createPaneInputItem_password);
		var createPaneInputField_password = $('<input />')
			.attr('id', 'lobby-game-create-password')
			.attr('name', 'lobby-game-create-password')
			.attr('type', 'text')
			.appendTo(createPaneInputItem_password);
			
		var createPaneInputItem_submit = $('<li />')
			.appendTo(createPaneInputs);
		var createPaneInputField_submit = $('<div />')
			.attr('id', 'lobby-game-create-submit')
			.addClass('button')
			.addClass('submit')
			.text(localization[LOCALE].gui.lobby.CREATE)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				var game = new Game();
				game.name = createPaneInputField_name.val();	
				game.password = createPaneInputField_password.val();
				game.isPrivate = createPaneInputField_isPrivate.is(":checked");
				self.createIn(game);
			})
			.appendTo(createPaneInputItem_submit);
	},

	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_LOBBY_PAYLOAD_CONNECT:
				this.connectOut(payload.data);
				break;
			case COMMUNICATION_LOBBY_PAYLOAD_CREATE:
				this.createOut(payload.data);
				break;
			case COMMUNICATION_LOBBY_PAYLOAD_JOIN:
				this.joinOut(payload.data);
				break;
		}
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_LOBBY, payload);
	},
	
	
	connectIn: function(name) {
		var connect = new LobbyConnectInPayload(name);
		this.sendPayload(connect.getPayload());
	},
	
	connectOut: function(data) {
		COMMUNICATION.playerId = data.playerId;
		COMMUNICATION.playerName = data.name;
		$(".lobby").show();
		$(".incommunicado").hide();
	},
	
	createIn: function(game) {
		var create = new LobbyCreateInPayload(game);
		this.sendPayload(create.getPayload());
	},
	
	createOut: function(data) {
		var anngameouncement = new Game();
		
		var game = new Game();
		game.id = data.gameId;
		game.name = data.name;
		game.players = data.players;
		game.isPrivate = data.isPrivate;
		this.games[game.id] = game;
		
		var output = $('<li />')
			.data('game-id', game.id)
			.bind('click', {context: this}, function(ev) {
				var self = ev.data.context;
				var $this = $(this);
				var gameId = $this.data('game-id');
				
				self.gameList.find(".active").removeClass("active");
				self.activeGameId = gameId;
				$this.addClass("active");
			})
			.appendTo(this.gameList);
		
		var viewport = new Viewport(output, VIEWPORT_LOBBY_GAMELIST);
		game.render(viewport);
	},
	
	joinIn: function(game, password) {
		var join = new LobbyJoinInPayload(game);
		join.password = password;
		this.sendPayload(join.getPayload());
	},
	
	joinOut: function(data) {
		if(data.playerId == COMMUNICATION.playerId) {
			// This user just joined a game
			$(".lobby").hide();
			$(".incommunicado").show();
		}
	},
	
	
	getGameById: function(id) {
		if(id in this.games)
			return this.games[id];
		return null;
	}
});

$(function() {
	window.LOBBY = new Lobby();
	window.LOBBY.connectIn("slifty");
});