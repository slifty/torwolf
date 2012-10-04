var communication = require('./communication'),
	lobby = require('./lobby');

var classes = require('./classes'),
	constants = require('../constants'),
	payloads = require('../payloads');

var states = {};
// Functions

function registerState(state, socket) {
	states[socket.id] = state;
}


// Exports
exports.connection(socket) {
	// TODO - Figure out if the user reconnected
	
	// Initialize with the default state
	var activateOut = new payloads.ActivatePayload();
}

exports.disconnection(socket) {
}

exports.interaction(interaction) {
	
}

exports.getStateBySocketId = function(socketId) {
	return (socketId in states)?states[socketId]:null;
}
