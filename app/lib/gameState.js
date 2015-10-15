var classes = require('../classes'),
	interactions = {},
	sockets = {},
	investigations = {},
	rumors = {};

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
	for(var x in game.Users) {
		sockets.push(exports.getSocketByPlayerId(game.Users[x].id));
	}
	return sockets;
};
