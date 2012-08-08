if(typeof(window) != "undefined") {
	var exports = window;
	var constants = window;
} else {
	constants = require('./constants');
}

// In
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

exports.GameCreateInPayload = function(game) {
	this.name = game.name;
	this.password = game.password;
	this.isPassword = game.isPassword;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_CREATE,
			data: {
				name: this.name,
				password: this.password,
				isPassword: this.isPassword
			}
		}
	};
};

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


// Out
exports.GameConnectOutPayload = function(name) {
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

exports.GameCreateOutPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GAME_PAYLOAD_CREATE,
			data: {
				id: this.game.id,
				isPassword: ((this.game.password == "")?false:true),
				maxPlayers: this.game.maxPlayers,
				name: this.game.name,
				players: this.game.players
			}
		}
	};
}

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


//Universal
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