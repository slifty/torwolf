var communication = require('./communication'),
	storyteller = require('./storyteller');
	
var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');


// Functions
function connect(data, socket) {
	player = new classes.Player();
	player.name = data.name;
	communication.registerPlayer(player, socket);
	
	// Tell the player that he has been recognized by the server
	var connect = new payloads.LobbyConnectOutPayload(player);
	exports.sendPayload(
		connect.getPayload(),
		socket);
	
	// Tell the player about each available game
	var games = communication.getGames();
	for(var x in games) {
		var create = new payloads.LobbyCreateOutPayload(games[x]);
		exports.sendPayload(
			create.getPayload(),
			socket);
	}
	
	// TODO -- add the ability to reconnect after D/C
	
}

function create(data, socket) {
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
	var create = new payloads.LobbyCreateOutPayload(game);
	
	return exports.sendPayload(
		create.getPayload(),
		communication.getSockets());
}

function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}

function join(data, socket) {
	var game = communication.getGameById(data.gameId);
	var player = communication.getPlayerBySocketId(socket.id);
	
	if(game == null)
		return error(locales[socket.locale].errors.lobby.JOIN_NONEXISTANT_GAME, socket);
	if(player.activeGame != "")
		return error(locales[socket.locale].errors.lobby.JOIN_ALREADY_IN_GAME, socket);
	if(game.isPrivate && game.password != data.password)
		return error(locales[socket.locale].errors.lobby.JOIN_INCORRECT_PASSWORD, socket);
	if(Object.keys(game.players).length >= game.roles.length)
		return error(locales[socket.locale].errors.lobby.JOIN_GAME_FULL	, socket);
	
	// Announce to the lobby that a game was joined
	var join = new payloads.LobbyJoinOutPayload(player, game);
	exports.sendPayload(
		join.getPayload(),
		communication.getSockets());
	
	// Announce to the storyteller that a player joined
	var join = new payloads.StorytellerJoinInPayload(player, game);
	storyteller.receivePayload(
		join.getPayload(),
		constants.COMMUNICATION_SOCKET_SERVER);
	
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_LOBBY_PAYLOAD_CONNECT:
			connect(payload.data, socket);
			break;
		case constants.COMMUNICATION_LOBBY_PAYLOAD_CREATE:
			create(payload.data, socket);
			break;
		case constants.COMMUNICATION_LOBBY_PAYLOAD_JOIN:
			join(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_LOBBY,
		payload,
		sockets)
};

