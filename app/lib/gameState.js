var classes = require('../classes'),
	interactions = {},
	sockets = {},
	investigations = {},
	rumors = {},
	games = {},
	roles = {},
	players = {},
	playersBySocketId = {},
	users = {};

// TODO: oh hello it's a massive memory leak

exports.switchIrcUserNick = function(playerId, newNick) {
	users[playerId].nick = newNick;
};

exports.getIrcUserByNick = function (nick) {
	for(var userId in users) {
		if(users[userId].nick === nick) {
			return users[userId];
		}
	}
	return null;
};

exports.getIrcUserByPlayerId = function (playerId) {
	return (playerId in users) ? users [playerId] : null;
};

exports.addPlayerToIrc = function(player) {
	users[player.id] = player;
};

exports.processInvestigations = function (game) {
	for(var x in game.activeInvestigations) {
		var investigation = game.activeInvestigations[x];
		delete this.activeInvestigations[rumorId];
		game.pastInvestigations[rumorId] = rumor;
	}
};

exports.assignRole = function(gameId, playerId, role) {
	roles[playerId] = role;
	var game = games[gameId];
	if (!game.roles[role]) {
		game.roles[role] = [];
	}
	game.roles[role].push(playerId);
};

exports.getRoleByPlayerId = function(playerId) {
	return roles[playerId];
};

exports.getPlayerById = function(playerId) {
	return players[playerId];
};

exports.addPlayerToGame = function(gameId, player, socket) {
	player.activeGameId = gameId;
	games[gameId].players.push(player);
	players[player.id] = player;
	playersBySocketId[socket.id] = player;
};

exports.storeGame = function(game) {
	game.roles = {};
	game.players = [];
	games[game.id] = game;
	game.activeInvestigations = {};
	game.pastInvestigations = {};
	game.rumorCount = 3;
	// TODO: locales
	game.locale = 'default';
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

exports.getPlayerBySocketId = function(socketId) {
	return playersBySocketId[socketId];
};

exports.getSocketByPlayerId = function(playerId) {
	return sockets[playerId];
};

exports.getSocketsByGameId = function(gameId) {
	var game = exports.getGameById(gameId);
	return exports.getSocketsByGame(game);
};

exports.getSocketsByGame = function(game) {
	var sockets = [];
	game = exports.getGameById(game.id);
	for(var x in game.players) {
		sockets.push(exports.getSocketByPlayerId(game.players[x].id));
	}
	return sockets;
};
