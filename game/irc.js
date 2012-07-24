var constants = require('../constants'),
	gamecomm = require('./communication');

// Exports
exports.receivePayload = function(message, socket) {
	gamecomm.more();
}