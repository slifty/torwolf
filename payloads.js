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

exports.IrcBroadcastInPayload = function(text) {
	this.text = text;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_IRC_PAYLOAD_BROADCAST,
			data: {
				text: this.text
			}
		}
	};
};

exports.IrcBroadcastOutPayload = function(message) {
	this.message = message;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_IRC_PAYLOAD_BROADCAST,
			data: {
				messageId: this.message.id,
				text: this.message.text,
				type: this.message.type,
				userId: this.message.userId
			}
		}
	};
};

exports.IrcJoinInPayload = function(alias) {
	this.alias = alias;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_IRC_PAYLOAD_JOIN,
			data: {
				alias: this.alias
			}
		}
	};
};

exports.IrcJoinOutPayload = function(user) {
	this.user = user;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_IRC_PAYLOAD_JOIN,
			data: {
				playerId: this.user.player.id,
				userId: this.user.id,
				alias: this.user.alias,
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
				locale: this.game.locale,
				maxPlayers: this.game.maxPlayers,
				name: this.game.name,
				players: this.game.players,
				roles: this.game.roles,
				rumorCount: this.game.rumorCount,
				tickLength: this.game.tickLength
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

exports.NewspaperPublishInPayload = function(game) {
	this.game = game
	
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_NEWSPAPER_PAYLOAD_PUBLISH,
			data: {
				gameId: this.game.id
			}
		}
	}
}

exports.NewspaperPublishOutPayload = function(edition) {
	this.edition = edition;
	
	this.getPayload = function() {
		var rumorIds = [];
		for(var x in this.edition.rumors)
			rumorIds.push(this.edition.rumors[x].id);
		
		return {
			type: constants.COMMUNICATION_NEWSPAPER_PAYLOAD_PUBLISH,
			data: {
				copy: this.edition.copy,
				editionId: this.edition.id,
				headline: this.edition.headline,
				round: this.edition.round,
				rumorIds: rumorIds
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

exports.StorytellerAnnouncementInPayload = function() {
}

exports.StorytellerAnnouncementOutPayload = function(text) {
	this.text = text;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_ANNOUNCEMENT,
			data: {
				text: this.text
			}
		}
	}
}

exports.StorytellerHeartbeatInPayload = function(game) {
	this.game = game;
	this.count = 0;
	
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_HEARTBEAT,
			data: {
				gameId: this.game.id,
				count: this.count
			}
		}
	};
};

exports.StorytellerHeartbeatOutPayload = function(count) {
	this.count = count;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_HEARTBEAT,
			data: {
				count: this.count,
			}
		}
	};
}

exports.StorytellerInvestigateInPayload = function(rumor) {
	this.rumor = rumor;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_INVESTIGATE,
			data: {
				rumorId: this.rumor.id
			}
		}
	};
};

exports.StorytellerInvestigateOutPayload = function() {
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

exports.StorytellerRumorInPayload = function() {
}

exports.StorytellerRumorOutPayload = function(rumor) {
	this.destinationId = "";
	this.truthStatus = "";
	this.rumor = rumor;
	this.sourceId = "";
	
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_RUMOR,
			data: {
				destinationId: this.destinationId,
				publicationStatus: this.rumor.publicationStatus,
				truthStatus: this.truthStatus,
				rumorId: this.rumor.id,
				sourceId: this.sourceId,
				text: this.rumor.text
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

exports.StorytellerTickInPayload = function(game) {
	this.game = game;
	
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_TICK,
			data: {
				gameId: this.game.id,
			}
		}
	};
};

exports.StorytellerTickOutPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_STORYTELLER_PAYLOAD_TICK,
			data: {
				round: this.game.round
			}
		}
	};
}

