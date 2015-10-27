var classes = require('../classes'),
	interactions = {},
	sockets = {},
	investigations = {},
	rumors = {},
	games = {};

exports.assignRole = function(gameId, playerId, role) {
	var game = games[gameId];
	if (!game.roles[role]) {
		game.roles[role] = [];
	}
	game.roles[role].push(playerId);
};

exports.addPlayerToGame = function(gameId, player) {
	games[gameId].players.push(player);
};

exports.storeGame = function(game) {
	game.roles = {};
	game.players = [];
	games[game.id] = game;
};

exports.getGameById = function(id) {
	return games[id];
};

exports.storeRumor = function(rumor) {
	rumors[rumor.id] = rumor;
};

exports.getRumorById = function(id) {
	return rumors[id];
};

exports.getInteractionById = function(interactionId) {
	return interactions[interactionId];
};

exports.storeInteraction = function(interaction) {
	interactions[interaction.id] = interaction;
};

exports.storeSocket = function(socket, playerId) {
	sockets[playerId] = socket;
};

exports.getSocketByPlayerId = function(playerId) {
	return sockets[playerId];
};

exports.getSocketsByGame = function(game) {
	var sockets = [];
	game = exports.getGameById(game.id);
	for(var x in game.players) {
		sockets.push(exports.getSocketByPlayerId(game.players[x].id));
	}
	return sockets;
};
