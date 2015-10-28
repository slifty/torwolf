
if(typeof(window) != "undefined") {
	var exports = window;
	var constants = window;
} else {
	constants = require('./message-types');
	locales = require('./locales/default.js');
}

// Generic Payloads
exports.ErrorPayload = function(content) {
	this.content = content;
	this.getPayload = function() {
		return {
			type: constants.GENERAL_ERROR,
			data: {
				content: this.content
			}
		}
	};
};

exports.ActivatePayload = function(content) {
	this.getPayload = function() {
		return {
			type: constants.GENERAL_ACTIVATE,
			data: {
			}
		}
	};
};

exports.DeactivatePayload = function(content) {
	this.getPayload = function() {
		return {
			type: constants.GENERAL_DEACTIVATE,
			data: {
			}
		}
	};
};


// Module Payloads
exports.EmailRegisterInPayload = function(account) {
	this.account = account;
	this.getPayload = function() {
		return {
			type: constants.EMAIL_REGISTER,
			data: {
				address: this.account.address
			}
		}
	};
};

exports.EmailRegisterOutPayload = function(account) {
	this.account = account;
	this.getPayload = function() {
		return {
			type: constants.EMAIL_REGISTERED,
			data: {
				accountId: this.account.id,
				address: this.account.address,
				playerId: (this.account.player == null)?'':this.account.player.id
			}
		}
	};
};

exports.EmailSendInPayload = function(message) {
	this.message = message;

	this.getPayload = function() {
		return {
			type: constants.EMAIL_SEND,
			data: {
				bccAddresses: this.message.bccAddresses,
				body: this.message.body,
				ccAddresses: this.message.ccAddresses,
				fromAddress: this.message.fromAddress,
				rumorIds: this.message.rumorIds,
				subject: this.message.subject,
				toAddresses: this.message.toAddresses
			}
		}
	};
};

exports.EmailSendOutPayload = function(message) {
	this.message = message;

	this.getPayload = function() {
		var ccAddresses = [];
		var toAddresses = [];
		for(var x in message.cc)
			ccAddresses.push(message.cc[x].address);
		for(var x in message.to)
			toAddresses.push(message.to[x].address);

		return {
			type: constants.EMAIL_SENT,
			data: {
				body: this.message.body,
				ccAddresses: ccAddresses,
				fromAddress: this.message.from.address,
				subject: this.message.subject,
				toAddresses: toAddresses
			}
		}
	};
};


exports.IrcConnectOutPayload = function(message) {
	this.message = message;
	this.user =  message.user;
	this.getPayload = function() {
		return {
			type: constants.IRC_CONNECTED,
			data: {
				messageId: this.message.id,
				playerId: this.user.player.id,
				text: this.message.text,
				type: this.message.type,
				userId: this.user.id
			}
		}
	};
};

exports.IrcMessageInPayload = function(text) {
	this.text = text;
	this.getPayload = function() {
		return {
			type: constants.IRC_MESSAGE,
			data: {
				text: this.text
			}
		}
	};
};

exports.IrcMessageOutPayload = function(message) {
	this.message = message;
	this.getPayload = function() {
		return {
			type: constants.IRC_MESSAGED,
			data: {
				messageId: this.message.id,
				text: this.message.text,
				type: this.message.type,
				userId: this.message.user.id
			}
		}
	};
};

exports.IrcJoinInPayload = function(nick) {
	this.nick = nick;
	this.getPayload = function() {
		return {
			type: constants.IRC_JOIN,
			data: {
				nick: this.nick
			}
		}
	};
};

exports.IrcJoinOutPayload = function(user) {
	this.user = user;
	this.getPayload = function() {
		return {
			type: constants.IRC_JOINED,
			data: {
				playerId: this.user.player.id,
				userId: this.user.id,
				nick: this.user.nick
			}
		}
	};
};

exports.IrcNickOutPayload = function(user) {
	this.user = user;
	this.getPayload = function() {
		return {
			type: constants.IRC_NICKSWITCHED,
			data: {
				nick: this.user.nick,
				userId: this.user.id
			}
		}
	}
};

exports.LobbyConnectInPayload = function(name) {
	this.name = name;
	this.getPayload = function() {
		return {
			type: constants.LOBBY_CONNECT,
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
			type: constants.LOBBY_CONNECTED,
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
			type: constants.LOBBY_CREATE,
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
			type: constants.LOBBY_CREATED,
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
			type: constants.LOBBY_JOIN,
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
			type: constants.LOBBY_JOINED,
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
			type: constants.NEWSPAPER_PUBLISH,
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
			type: constants.NEWSPAPER_PUBLISHED,
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


exports.SnooperInterceptInPayload = function(interaction) {
	this.interaction = interaction;

	this.getPayload = function() {
		return {
			type: constants.SNOOPER_INTERCEPT,
			data: {
				interactionId: this.interaction.id
			}
		}
	}
}

exports.SnooperInterceptOutPayload = function(interaction, player) {
	this.interaction = interaction;
	this.player = player;

	this.getPayload = function() {
		return {
			type: constants.SNOOPER_INTERCEPTED,
			data: {
				interactionId: this.interaction.id,
				message: this.interaction.message,
				playerId: this.player?this.player.id:"",
				responses: this.interaction.responses
			}
		}
	}
}

exports.SnooperSslInPayload = function() {
	this.getPayload = function() {
		return {
		}
	}
}

exports.SnooperSslOutPayload = function(player, target) {
	this.player = player;
	this.target = target;

	this.getPayload = function() {
		return {
			type: constants.SNOOPER_SSLED,
			data: {
				playerId: this.player.id,
				target: this.target
			}
		}
	}
}

exports.SnooperTorInPayload = function() {
	this.getPayload = function() {
		return {
		}
	}
}

exports.SnooperTorOutPayload = function(player, state) {
	this.player = player;
	this.state = state;

	this.getPayload = function() {
		return {
			type: constants.SNOOPER_TORRED,
			data: {
				playerId: this.player.id,
				state: this.state
			}
		}
	}
}

exports.SnooperWiretapInPayload = function(player) {
	this.player = player;

	this.getPayload = function() {
		return {
			type: constants.SNOOPER_WIRETAP,
			data: {
				playerId: player.id
			}
		}
	}
}

exports.SnooperWiretapOutPayload = function(player) {
	this.player = player;

	this.getPayload = function() {
		return {
			type: constants.SNOOPER_WIRETAPPED,
			data: {
				playerId: player.id
			}
		}
	}
}

exports.StorytellerSubpoenaIrcInPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_IRCSUBPOENA,
			data: {
				gameId: game.id
			}
		}
	};
};

exports.StorytellerSubpoenaIrcOutPayload = function() {
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_IRCSUBPOENAD,
			data: {}
		}
	};
}

exports.StorytellerSubpoenaEmailInPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_EMAILSUBPOENA,
			data: {
				gameId: game.id
			}
		}
	};
};

exports.StorytellerSubpoenaEmailOutPayload = function() {
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_EMAILSUBPOENAD,
			data: {}
		}
	};
}

exports.StorytellerAllegianceInPayload = function() {
}

exports.StorytellerAllegianceOutPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_ALLEGIANCECHANGE,
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
			type: constants.STORYTELLER_ANNOUNCEMENT,
			data: {
				text: this.text
			}
		}
	}
}


exports.StorytellerEndInPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_END,
			data: {
				gameId: this.game.id
			}
		}
	}
}

exports.StorytellerEndOutPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_ENDED,
			data: {
				gameId: this.game.id,
			}
		}
	}
}


exports.StorytellerHeartbeatInPayload = function(game, count) {
	this.game = game;
	this.count = count;

	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_HEARTBEATPONG,
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
			type: constants.STORYTELLER_HEARTBEATPING,
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
			type: constants.STORYTELLER_INVESTIGATE,
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
			type: constants.STORYTELLER_JOIN,
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
			type: constants.STORYTELLER_JOINED,
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

exports.StorytellerKillInPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_KILL,
			data: {
				playerId: this.player.id
			}
		}
	}
}

exports.StorytellerKillOutPayload = function(player) {
	this.player = player;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_KILLED,
			data: {
				playerId: this.player.id,
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
			type: constants.STORYTELLER_ROLESET,
			data: {
				playerId: this.player.id,
				role: this.player.role
			}
		}
	}
}

exports.StorytellerRumorInPayload = function(rumor) {
	this.destinationId = "";
	this.rumor = rumor;
	this.sourceId = "";
	this.truthStatus = "";

	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_RUMOR,
			data: {
				destinationId: this.destinationId,
				rumorId: this.rumor.id,
				sourceId: this.sourceId,
				truthStatus: this.truthStatus
			}
		}
	}

}

exports.StorytellerRumorOutPayload = function(rumor) {
	this.destinationId = "";
	this.rumor = rumor;
	this.sourceId = "";
	this.truthStatus = "";

	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_RUMORRECEIVED,
			data: {
				destinationId: this.destinationId,
				publicationStatus: this.rumor.publicationStatus,
				rumorId: this.rumor.id,
				sourceId: this.sourceId,
				text: this.rumor.text,
				truthStatus: this.truthStatus
			}
		}
	}
}

exports.StorytellerStartInPayload = function(game) {
	this.game = game;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_START,
			data: {
				gameId: this.game.id
			}
		}
	}
}

exports.StorytellerStartOutPayload = function(game) {
}

exports.StorytellerTickInPayload = function(game, round) {
	this.game = game;
	this.round = round;

	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_TICK,
			data: {
				gameId: this.game.id,
				round: this.round
			}
		}
	};
};

exports.StorytellerTickOutPayload = function(round) {
	this.round = round;
	this.getPayload = function() {
		return {
			type: constants.STORYTELLER_TOCK,
			data: {
				round: this.rounds
			}
		}
	};
};

exports.TorConnectInPayload = function() {
	this.getPayload = function() {
		return {
			type: constants.TOR_CONNECT,
			data: {
			}
		}
	};
};

exports.TorConnectOutPayload = function() {
	this.getPayload = function() {
		return {
			type: constants.TOR_CONNECTED,
			data: {
			}
		}
	};
}

exports.TorDisconnectInPayload = function() {
	this.getPayload = function() {
		return {
			type: constants.TOR_DISCONNECT,
			data: {
			}
		}
	};
};

exports.TorDisconnectOutPayload = function() {
	this.getPayload = function() {
		return {
			type: constants.TOR_DISCONNECTED,
			data: {
			}
		}
	};
}

exports.TorRouteInPayload = function(message) {
	this.message = message;
	this.bridgeId = "";

	this.getPayload = function() {
		return {
			type: constants.TOR_ROUTE,
			data: {
				bridgeId: this.bridgeId,
				message: this.message
			}
		}
	};
};

exports.TorRouteOutPayload = function(message) {
	this.message = message;
	this.bridgeId = "";

	this.getPayload = function() {
		return {
			type: constants.TOR_ROUTED,
			data: {
				bridgeId: this.bridgeId,
				message: this.message
			}
		}
	};
}

exports.TorEducateOutPayload = function(teacherId, studentId) {
	this.teacherId = teacherId;
	this.studentId = studentId;

	this.getPayload = function() {
		return {
			type: constants.TOR_EDUCATED,
			data: {
				teacherId: this.teacherId,
				studentId: this.studentId
			}
		}
	};
}

exports.TorEducateInPayload = function(message) {
	this.teacherId = teacherId;
	this.studentId = studentId;

	this.getPayload = function() {
		return {
			type: constants.TOR_EDUCATE,
			data: {
				teacherId: this.teacherId,
				studentId: this.studentId
			}
		}
	};
}
