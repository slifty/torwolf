var messageTypes = require('../../message-types'),
	heartbeat = require('./heartbeat'),
	start = require('./storyteller/startGame'),
	join = require('./storyteller/joinGame'),
	tick = require('./storyteller/tick'),
	ircSubpoena = require('./storyteller/subpoenaIrc'),
	emailSubpoena = require('./storyteller/subpoenaEmail'),
	kill = require('./storyteller/kill'),
	end = require('./storyteller/end'),
	publish = require('./newspaper/publish'),
	joinIrc = require('./irc/join'),
	leaveIrc = require('./irc/leave'),
	messageIrc = require('./irc/message'),
	table = {};

table[messageTypes.STORYTELLER_HEARTBEATPONG] = heartbeat;
table[messageTypes.STORYTELLER_JOIN] = join;
table[messageTypes.STORYTELLER_START] = start;
table[messageTypes.STORYTELLER_TICK] = tick;
table[messageTypes.STORYTELLER_IRCSUBPOENA] = ircSubpoena;
table[messageTypes.STORYTELLER_EMAILSUBPOENA] = emailSubpoena;
table[messageTypes.STORYTELLER_KILL] = kill;
table[messageTypes.STORYTELLER_END] = end;

table[messageTypes.NEWSPAPER_PUBLISH] = publish;

table[messageTypes.IRC_JOIN] = joinIrc;
table[messageTypes.IRC_LEAVE] = leaveIrc;
table[messageTypes.IRC_MESSAGE] = messageIrc;

module.exports = table;
