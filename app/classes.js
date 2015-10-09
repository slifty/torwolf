var uuid = require('uuid');

exports.Interaction = function() {
	this.id = uuid.v4();
	this.isSsl = false;
	this.isTor = false;
	this.message = null; // The message that initiated this interaction
	this.responses = []; // The messages that have been sent as a response to this interaction
	this.socket = null; // The socket that initiated this interaction
};
