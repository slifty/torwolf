var communication = require('./communication'),
	storyteller = require('./storyteller');
	
var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');


// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

// Handlers
function handleConnect(data, socket) {
	player = new classes.Player();
	player.name = data.name;
	communication.registerPlayer(player, socket);
	
	// Tell the player that he has been recognized by the server
	var connectOut = new payloads.LobbyConnectOutPayload(player);
	exports.sendPayload(
		connectOut.getPayload(),
		socket);
	
	// Tell the player about each available game
	var games = communication.getGames();
	for(var x in games) {
		var createOut = new payloads.LobbyCreateOutPayload(games[x]);
		
		console.log(createOut);
		exports.sendPayload(
			createOut.getPayload(),
			socket);
	}
	
	// TODO -- add the ability to reconnect after D/C
	
}

function handleCreate(data, socket) {
	if(data.name == "")
		return error(locales[socket.locale].errors.lobby.CREATE_NAME_BLANK, socket);
	
	if(data.isPrivate && data.password == "")
		return error(locales[socket.locale].errors.lobby.CREATE_PASSWORD_BLANK, socket);
	
	var game = new classes.Game();
	game.name = data.name;
	game.isPrivate = data.isPrivate;
	game.password = data.password;
	communication.registerGame(game);
	
	// Announce the new game to the lobby
	var createOut = new payloads.LobbyCreateOutPayload(game);
	
	exports.sendPayload(
		createOut.getPayload(),
		communication.getSockets());
	
	// Add the creator to the game
	var joinIn = new payloads.LobbyJoinInPayload(game);
	joinIn.password = game.password;
	exports.receivePayload(
		joinIn.getPayload(),
		socket);
}

function handleJoin(data, socket) {
	var game = communication.getGameById(data.gameId);
	var player = communication.getPlayerBySocketId(socket.id);
	
	if(game == null)
		return error(locales[socket.locale].errors.lobby.JOIN_NONEXISTANT_GAME, socket);
	if(player.activeGameId != "")
		return error(locales[socket.locale].errors.lobby.JOIN_ALREADY_IN_GAME, socket);
	if(game.isPrivate && game.password != data.password)
		return error(locales[socket.locale].errors.lobby.JOIN_INCORRECT_PASSWORD, socket);
	if(Object.keys(game.players).length >= game.roles.length)
		return error(locales[socket.locale].errors.lobby.JOIN_GAME_FULL	, socket);
	
	// Announce to the lobby that a game was joined
	var joinOut = new payloads.LobbyJoinOutPayload(player, game);
	exports.sendPayload(
		joinOut.getPayload(),
		communication.getSockets());
	
	// Announce to the storyteller that a player joined
	var joinIn = new payloads.StorytellerJoinInPayload(player, game);
	storyteller.receivePayload(
		joinIn.getPayload(),
		constants.COMMUNICATION_SOCKET_SERVER);
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_LOBBY_PAYLOAD_CONNECT:
			handleConnect(payload.data, socket);
			break;
		case constants.COMMUNICATION_LOBBY_PAYLOAD_CREATE:
			handleCreate(payload.data, socket);
			break;
		case constants.COMMUNICATION_LOBBY_PAYLOAD_JOIN:
			handleJoin(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_LOBBY,
		payload,
		sockets)
};

exports.sendPayload = function(payload, sockets, interactionId) {
	if(interactionId) payload.data._interactionId = interactionId; 
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_LOBBY,
		payload,
		sockets)
};

