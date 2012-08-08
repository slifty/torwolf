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

exports.GameConnectInPayload = function(name) {
	var name = name;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_CONNECT,
			data: {
				name: name
			}
		}
	};
};

exports.GameConnectOutPayload = function(player) {
	var id = player.id;
	var name = player.name;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_CONNECT,
			data: {
				id: id,
				name: player.name
			}
		}
	};
};

exports.GameCreateInPayload = function(game) {
	this.name = game.name;
	this.password = game.password;
	this.isPrivate = game.isPrivate;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_CREATE,
			data: {
				name: this.name,
				password: this.password,
				isPrivate: this.isPrivate
			}
		}
	};
};

exports.GameCreateOutPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_CREATE,
			data: {
				id: this.game.id,
				isPrivate: this.game.isPrivate,
				maxPlayers: this.game.maxPlayers,
				name: this.game.name,
				players: this.game.players
			}
		}
	};
}

exports.GameJoinInPayload = function(game) {
	this.game = game;
	this.password = "";
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_JOIN,
			data: {
				gameId: this.game.id,
				password: this.password
			}
		}
	};
};

exports.GameJoinOutPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_JOIN,
			data: {
				id: player.id,
				alive: player.alive,
				name: player.name,
				role: constants.PLAYER_ROLE_UNKNOWN,
				allegiance: constants.PLAYER_ALLEGIANCE_UNKNOWN
			}
		}
	}
}
