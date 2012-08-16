if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

(function() {
	var locale = "default";
	exports.localization = {};
	exports.localization[locale] = {};
	
	exports.localization[locale]["errors"] = {
		storyteller: {
			JOIN_LOBBY: "You can only join games through the lobby.",
			START_SYSTEM: "Only the system can start a game."
		},
		lobby: {
			CREATE_NAME_BLANK: "Your game name cannot be blank.",
			CREATE_PASSWORD_BLANK: "You cannot have a private game without a password.",
			JOIN_ALREADY_IN_GAME: "You are already in a game.",
			JOIN_GAME_FULL: "This game is full.",
			JOIN_INCORRECT_PASSWORD: "You did not enter the correct password.",
			JOIN_NONEXISTANT_GAME: "The game you tried to join doesn't exist."
		}
	};
	
	exports.localization[locale]["gui"] = {
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
		lobby: {
			CREATE: "Create",
			JOIN: "Join"
		}
	};
})();