var uuid = require('uuid'),
	constants = require('../constants'),
	words = require('../words');

exports.IrcMessage = function(text, type, user) {
		this.id = uuid.v4();
		this.text = text;
		this.type = type;
		this.user = user;

		//getters and setters
		this.getId = function() {
			return this.id;
		};
		this.getText = function() {
			return this.text;
		};
		this.getType = function() {
			return this.type;
		};
		this.getUser = function() {
			return this.user;
		};
		this.setText = function(text) {
			this.text = text;
		};
};

exports.IrcUser = function() {
	this.id = uuid.v4();
	this.nick = "";
	this.player = null;
};

exports.Interaction = function() {
	this.id = uuid.v4();
	this.isSsl = false;
	this.isTor = false;
	this.message = null; // The message that initiated this interaction
	this.responses = []; // The messages that have been sent as a response to this interaction
	this.socket = null; // The socket that initiated this interaction
};

exports.Rumor = function(gameId) {
	this.generateText = function() {
		var rumorText = "";
		for(var x = 0 ; x < 2 ; ++x) {
			var word = words.words[Math.floor(Math.random() * words.words.length)];
			rumorText += ((x===0)?"":" ") + word;
		}
		return rumorText;
	};

	this.gameId = gameId;
	this.id = uuid.v4();
	this.truthStatus = "";
	this.publicationStatus = "";
	this.sourceId = "";
	this.text = this.generateText();
	this.transfers = [];

	this.getPlayerTruthStatus = function(player) {
		if (this.publicationStatus == constants.RUMOR_PUBLICATIONSTATUS_PUBLISHED || this.sourceId === player.id) {
			return this.truthStatus;
		} else {
			return constants.RUMOR_TRUTHSTATUS_UNKNOWN;
		}
	};
};
