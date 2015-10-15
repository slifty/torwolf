var uuid = require('uuid'),
	constants = require('../constants'),
	words = require('../words');

exports.Interaction = function() {
	this.id = uuid.v4();
	this.isSsl = false;
	this.isTor = false;
	this.message = null; // The message that initiated this interaction
	this.responses = []; // The messages that have been sent as a response to this interaction
	this.socket = null; // The socket that initiated this interaction
};

exports.Rumor = function(gameId) {
	this.gameId = gameId;
	this.id = uuid.v4();
	this.truthStatus = "";
	this.publicationStatus = "";
	this.sourceId = "";
	this.text = "";
	this.transfers = [];
	this.rumor = generateRumor();

	this.getPlayerTruthStatus = function(player) {
		if (this.publicationStatus == constants.RUMOR_PUBLICATIONSTATUS_PUBLISHED || this.sourceId === player.id) {
			return this.truthStatus;
		} else {
			return constants.RUMOR_TRUTHSTATUS_UNKNOWN;
		}
	};

	this.randomWord = function() {
		var x = Math.floor(Math.random() * words.words.length);
		return words.words[x];
	};

	function generateRumor () {
		var rumorText = "";
		for(var x = 0 ; x < 2 ; ++x) {
			var word = this.randomWord();
			rumorText += ((x===0)?"":" ") + word;
		}

		this.text = rumorText;
		return rumor;
	}
};
