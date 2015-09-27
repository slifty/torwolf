var uuid = require('node-uuid');

var constants = require('../constants');

exports.IrcMessage = function(text, type, user) {
		this.id = uuid.v4();
		this.text = text;
		this.type = type;
		this.user = user;
	
		//getters and setters
		this.getId = function() {
			return this.id
		}
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