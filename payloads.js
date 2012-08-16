if(typeof(window) != "undefined") {
	var exports = window;
	var constants = window;
} else {
	constants = require('./constants');
}

exports.ErrorPayload = function(content) {
	this.content = content;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_ERROR,
			data: {
				content: this.content
			}
		}
	};
};

exports.LobbyConnectInPayload = function(name) {
	this.name = name;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_LOBBY_PAYLOAD_CONNECT,
			data: {
				name: this.name
			}
		}
	};
};

exports.LobbyConnectOutPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_LOBBY_PAYLOAD_CONNECT,
			data: {
				playerId: this.player.id,
				name: this.player.name
			}
		}
	};
};

exports.LobbyCreateInPayload = function(game) {
	this.name = game.name;
	this.password = game.password;
	this.isPrivate = game.isPrivate;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_LOBBY_PAYLOAD_CREATE,
			data: {
				name: this.name,
				password: this.password,
				isPrivate: this.isPrivate
			}
		}
	};
};

exports.LobbyCreateOutPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_LOBBY_PAYLOAD_CREATE,
			data: {
				gameId: this.game.id,
				isPrivate: this.game.isPrivate,
				maxPlayers: this.game.maxPlayers,
				name: this.game.name,
				players: this.game.players
			}
		}
	};
}

exports.LobbyJoinInPayload = function(game) {
	this.game = game;
	this.password = "";
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_LOBBY_PAYLOAD_JOIN,
			data: {
				gameId: this.game.id,
				password: this.password
			}
		}
	};
};

exports.LobbyJoinOutPayload = function(player, game) {
	this.player = player;
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_LOBBY_PAYLOAD_JOIN,
			data: {
				playerId: this.player.id,
				gameId: this.game.id
			}
		}
	}
}

exports.StorytellerAllegianceInPayload = function() {
}

exports.StorytellerAllegianceOutPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE,
			data: {
				playerId: this.player.id,
				allegiance: this.player.allegiance 
			}
		}
	}
}

exports.StorytellerJoinInPayload = function(player, game) {
	this.game = game;
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_JOIN,
			data: {
				gameId: this.game.id,
				playerId: this.player.id
			}
		}
	};
};

exports.StorytellerJoinOutPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_JOIN,
			data: {
				playerId: this.player.id,
				status: this.player.status,
				name: this.player.name,
				role: constants.PLAYER_ROLE_UNKNOWN,
				allegiance: constants.PLAYER_ALLEGIANCE_UNKNOWN
			}
		}
	}
}

exports.StorytellerRoleInPayload = function() {
}

exports.StorytellerRoleOutPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_ROLE,
			data: {
				playerId: this.player.id,
				role: this.player.role 
			}
		}
	}
}


exports.StorytellerStartInPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_START,
			data: {
				gameId: this.game.id 
			}
		}
	}
}

exports.StorytellerStartOutPayload = function(game) {
}