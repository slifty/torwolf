var uuid = require('node-uuid');

var constants = require('../constants'),
	payloads = require('../payloads'),
	communication = require('./communication');

var games = {};
var lobby = {};


// Classes
function Game () {
	this.id = uuid.v1();
	this.maxPlayers = 8;
	this.messages = [];
	this.name = "";
	this.password = "";
	this.players = {};
	this.secrets = [];
	this.secretCount = 3;
}

function Player () {
	this.alive = true,
	this.allegiance = "";
	this.id = uuid.v1();
	this.name = "";
	this.role = "";
	this.secrets = [];
}


// Functions
function connect(data, socket) {
	var player = new Player();
	player.name = data.name;
	
	lobby[player.id] = player;
	communication.registerPlayer(player,socket);
}

function join(data, socket) {
	if(!data.gameId in games)
		return error("The game you tried to join doesn't exist.", socket);
	var game = games[data.gameId];
	var player = communication.getPlayerBySocketId(socket.id);
	delete lobby[player.id];
	game.players[player.id] = player;
	
	var sockets = [];
	for(var x in game.players)
		sockets.push(communication.getSocketByPlayerId(game.players[x].id));
	
	console.log(sockets);
	
	var join = new payloads.GameJoinOutPayload(player);
	communication.sendMessage(constants.COMMUNICATION_TARGET_GAME, join.getPayload(), sockets);
}

function create(data, socket) {
	if(data.name == "")
		return error("Your game name cannot be blank.", socket);
	if(data.isPassword && data.password == "")
		return error("You cannot have a private game without a password.", socket);
	var game = new Game();
	game.name = data.name;
	game.password = data.password;
	games[game.id] = game;
	
	var sockets = [];
	for(var x in lobby)
		sockets.push(communication.getSocketByPlayerId(lobby[x].id));
	
	var create = new payloads.GameCreateOutPayload(game);
	return communication.sendMessage(constants.COMMUNICATION_TARGET_GAME, create.getPayload(), sockets);
}

function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return communication.sendMessage(constants.COMMUNICATION_TARGET_GAME, error.getPayload(), socket);
}


function ready(data, socket) {
}

function startGame() {
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		case constants.COMMUNICATION_GAME_PAYLOAD_CONNECT:
			connect(payload.data, socket);
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_CREATE:
			create(payload.data, socket);
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_JOIN:
			join(payload.data, socket);
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_JOIN_LISTGAMES:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_LEAVE:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_READY:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_SETALLEGIANCE:
			break;
		case constants.COMMUNICATION_GAME_PAYLOAD_SETROLE:
			break;
	}
};

