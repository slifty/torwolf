if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

(function() {
	var locale = "en";
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
})();