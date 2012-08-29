var uuid = require('node-uuid');

var constants = require('../constants'),
	locales = require('../locales'),
	words = require('./words');

exports.Game = function() {
	this.activeInvestigations = [];
	this.id = uuid.v4();
	this.isPrivate = false;
	this.locale = constants.LOCALE_DEFAULT;
	this.messages = [];
	this.name = "";
	this.password = "";
	this.pastInvestigations = [];
	this.players = {};
	/*this.roles = [constants.PLAYER_ROLE_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_ACTIVIST,
		constants.PLAYER_ROLE_CITIZEN_SPY,
		constants.PLAYER_ROLE_EDITOR,
		constants.PLAYER_ROLE_JOURNALIST,
		constants.PLAYER_ROLE_SPY];*/
	this.roles = [
		constants.PLAYER_ROLE_JOURNALIST,
		
	];
	this.round = 0;
	this.rumors = {};
	this.rumorCount = 3;
	this.tickLength = 5 * 1000; //2 * 60 * 1000; // Tick length in Miliseconds
	this.usedWords = [];
	
	
	this.popRole = function() { // Generate a random role
		if(this.roles.length == 0) return null;
		return this.roles.splice(Math.floor(Math.random() * this.roles.length), 1)[0];
	};
	
	this.processInvestigation = function(rumorId) {
		var rumor = this.activeInvestigations[rumorId];
		delete this.activeInvestigations[rumorId];
		this.pastInvestigations[rumorId] = rumor;
	}
	
	this.generateRumor = function() {
		var rumor = new exports.Rumor();
		var rumorText = "";
		for(var x = 0 ; x < 2 ; ++x) {
			var word = rumor.randomWord();
			if(this.usedWords.indexOf(word) != -1) {
				--x;
				continue;
			}
			this.usedWords.push(word);
			rumorText += ((x==0)?"":" ") + word;
		}
		
		rumor.text = rumorText;
		return rumor;
	}

	this.getRumorById = function(rumorId) {
		return (rumorId in this.rumors)?this.rumors[rumorId]:null;
	}

}

exports.NewspaperEdition = function () {
	this.id = uuid.v4();
	this.headline = "";
	this.copy = "";
	this.round = 0;
	this.rumors = [];
}

exports.Player = function() {
	this.activeGameId = "";
	this.allegiance = "";
	this.id = uuid.v4();
	this.name = "";
	this.role = "";
	this.rumors = [];
	this.status = constants.PLAYER_STATUS_ALIVE;
}

exports.Rumor = function() {
	this.id = uuid.v4();
	this.truthStatus = "",
	this.publicationStatus = "";
	this.sourceId = "";
	this.text = "";
	this.transfers = [];
	
	this.randomWord = function() {
		var x = Math.floor(Math.random() * words.words.length);
		return words.words[x];
	}
}