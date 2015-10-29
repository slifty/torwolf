var payloads = require('../../payloads');
var messageTypes = require('../../message-types');

// Functions
module.exports = function (message, socket) {
	var error = new payloads.ErrorPayload(message);
	socket.emit('error', {
		payload: error.getPayload()
	});
};
