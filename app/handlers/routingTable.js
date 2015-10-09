var messageTypes = require('../../message-types');

var heartbeat = require('./heartbeat');

var table = {};
table[messageTypes.STORYTELLER_HEARTBEATPONG] = heartbeat;

module.exports = table;
