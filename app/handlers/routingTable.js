var messageTypes = require('../../message-types'),
	heartbeat = require('./heartbeat'),
	start = require('./storyteller/startGame'),
	join = require('./storyteller/joinGame'),
	tick = require('./storyteller/tick'),
	table = {};

table[messageTypes.STORYTELLER_HEARTBEATPONG] = heartbeat;
table[messageTypes.STORYTELLER_JOIN] = join;
table[messageTypes.STORYTELLER_START] = start;
table[messageTypes.STORYTELLER_TICK] = tick;

module.exports = table;
