if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

(function() {
	var locale = "default";
	exports.localization = {};
	exports.localization[locale] = {};
	
	exports.localization[locale]["errors"] = {
		email: {
			ADDRESS_EMPTY: "you cannot create an empty email address",
			ADDRESS_TAKEN: "an account by that name already exists"
		},
		lobby: {
			CREATE_NAME_BLANK: "Your game name cannot be blank.",
			CREATE_PASSWORD_BLANK: "You cannot have a private game without a password.",
			JOIN_ALREADY_IN_GAME: "You are already in a game.",
			JOIN_GAME_FULL: "This game is full.",
			JOIN_INCORRECT_PASSWORD: "You did not enter the correct password.",
			JOIN_NONEXISTANT_GAME: "The game you tried to join doesn't exist."
		},
		newspaper: {
		},
		storyteller: {
			GAMEOVER_SYSTEM: "Only the system can end the game.",
			HEARTBEAT_SYSTEM: "Only the system can trigger a heartbeat.",
			INVESTIGATE_NOGAME: "You aren't connected to a game.",
			INVESTIGATE_NOJOURNALIST: "Only the journalist may investigate rumors.",
			INVESTIGATE_NOPLAYER: "You aren't a registered player on the server.",
			INVESTIGATE_NORUMOR: "That rumor doesn't exist in this game.",
			INVESTIGATE_OLDRUMOR: "That rumor has already been investigated.",
			RUMOR_INVALID_RUMOR: "The specified rumor does not exist.",
			RUMOR_INVALID_SOURCE: "The specified player does not know that rumor.",
			RUMOR_SYSTEM: "Only the system can decide when rumors are spread.",
			JOIN_LOBBY: "You can only join games through the lobby.",
			START_SYSTEM: "Only the system can start a game.",
			TICK_SYSTEM: "Only the system can trigger a tick.",
		},
		tor: {
			DISABLED: "Your proxy has not been properly configured."
		}
	};
	
	exports.localization[locale]["gui"] = {
		lobby: {
			CREATE: "Create",
			JOIN: "Join",
			PASSWORD_PROMPT: "This game is private.  What's the password?",
			
			badges: {
				PRIVATE: "Private"
			},
			create: {
				ISPRIVATE: "Private",
				NAME: "Name:",
				PASSWORD: "Password"
			},
		},
		email: {
			tabs: {
				ACCOUNT: 'Accounts',
				ADDRESSES: 'Address Book',
				COMPOSE: 'Compose',
				INBOX: 'Inbox',
				SETTINGS: 'Settings'
			},
			
			ADDRESS: "Address",
			ATTACH_RUMOR: "Attach a rumor",
			BCC: "Bcc",
			CC: "Cc",
			CREATE: "Create Account",
			FROM: "From",
			REMOVE: "Remove",
			RUMOR: "Rumor",
			SEND: "Send",
			SUBJECT: "Subject",
			TO: "To",
			TOR: "Use Tor"
		},
		irc: {
			SEND: "Send",
		},
		player: {
			YOU: "You",
			
			allegiance: {
				G: "Government",
				N: "Neutral",
				R: "Rebellion",
				U: "Unknown"
			},
			allegianceCode: {
				G: "G",
				N: "N",
				R: "R",
				U: "U"
			},
			role: {
				A: "Activist",
				C: "Citizen",
				CA: "Citizen (Activist)",
				CS: "Citizen (Spy)",
				E: "Editor",
				J: "Journalist",
				S: "Spy",
				U: "Unknown"
			},
			roleCode: {
				A: "A",
				C: "C",
				CA: "CA",
				CS: "CS",
				E: "E",
				J: "J",
				S: "S",
				U: "U"
			},
			status: {
				A: "Alive",
				D: "Dead"
			}
		},
		rumor: {
			investigationStatus: {
				C: "Complete",
				I: "Investigating...",
				N: "Not Investigating"
			},
			investigationStatusCode: {
				C: "C",
				I: "I",
				N: "N"
			},
			publicationStatus: {
				P: "Published",
				U: "Unpublished"
			},
			publicationStatusCode: {
				P: "P",
				U: "U"
			},
			truthStatus: {
				T: "True",
				F: "False",
				U: "Unknown"
			},
			truthStatusCode: {
				T: "T",
				F: "F",
				U: "U"
			},
			
			INVESTIGATE: "Investigate"
		},
		tor: {
			ACTIVATE: "Activate Tor",
			DEACTIVATE: "Deactivate Tor"
		}
	};
		
	exports.localization[locale]["messages"] = {
		irc: {
			JOINED: "has joined the channel.",
			LEFT: "has left the channel.",
		},
		storyteller: {
			GAMEOVER: "The game is over.",
			KILL: "%s walks up to %s, takes out his gun, and shoots.  It is not a pretty scene",
			NEWS_NOTHING: "The journalist did not publish an article last month.",
			NEWS_SOMETHING: "The journalist published an article last month!  It is sitting on your doorstep.",
			ROUND_BEGIN: "Month %d has begun.",
			ROUND_END: "Month %d has ended.",
			VICTORY_ACTIVISTS_MEDIA: "With so many secrets about the government revealed, the world has started to pay attention.  The battle isn't over, but the media effort has come to a close.  The rebels and the journalist have won.",
			VICTORY_ACTIVISTS_KILLING: "The murder of an innocent civilian has sparked outrage across the world.  As the newsroom continues to issue reports of corruption and crimes against humanity, the government finally begins to face serious pressure.  The battle isn't over, but the media effort has come to a close.  The rebels and the journalist have won.",
			VICTORY_GOVERNMENT_JOURNALIST: "The journalist has been killed.  The world is outraged, but with no source of information that outrage is short lived.  The government is able to continue forward as planned. The rebels and the journalist have lost.",
			VICTORY_GOVERNMENT_ACTIVIST: "The activist has been killed.  Some of the world notices, but it is generally overlooked.  With no leadership the rebels fall apart.  The government doesn't skip a beat. The rebels and the journalist have lost.",
			WARNING: "This turn ends in %d %s.",
			WARNING_UNIT_SINGULAR: "second",
			WARNING_UNIT_PLURAL: "seconds",
		},
		newspaper: {
			FALSE_HEADLINES: [
				"No Merit to \'%s\'",
				"\'%s\' Hoax Debunked"
			],
			FALSE_COPY: [
				"It turns out that the popular rumor about \'%s\' isn't true.",
			],
			NO_HEADLINE: "Nothing was written about your country this month",
			NO_COPY: "Apparently nothing interesting happened in your country worth reporting on.",
			TRUE_HEADLINES: [
				"BREAKING: Secret \'%s\' mission revealed",
				"Verified reports of government-run \'%s\' project",
			],
			TRUE_COPY: [
				"There are serious concerns about the welfare of the people due to the \'%s\' project.",
			]
		}
	};
})();