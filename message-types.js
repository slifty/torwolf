if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

exports.EMAIL_REGISTER = "register"; // A new email account has been created
exports.EMAIL_SEND = "send"; // An email has been sent

exports.GENERAL_ACTIVATE = "activate"; // Activate torwolf?
exports.GENERAL_DEACTIVATE = "deactivate"; // Deactivate torwolf?
exports.GENERAL_ERROR = "error"; // An error has occurred

exports.IRC_CONNECT = "connect"; // A player has connected to IRC
exports.IRC_DISCONNECT = "disconnect" // a player has disconnected from IRC
exports.IRC_MESSAGE = "message"; // An IRC message has been sent
exports.IRC_JOIN = "join"; // A player has joined an IRC channel
exports.IRC_LEAVE = "leave"; // A player has left an IRC channel
exports.IRC_NICK = "switch nick"; // A player has switched nicks

exports.LOBBY_CONNECT = "connect" // A player has connected to the lobby
exports.LOBBY_CREATE = "create"; // A new game has been created
exports.LOBBY_JOIN = "join"; // A player has joined the lobby

exports.NEWSPAPER_PUBLISH = "publish"; // A paper has been published

exports.SNOOPER_INTERCEPT = "intercept"; // A plaintext message has been intercepted
exports.SNOOPER_SSL = "ssl"; // An encrypted message has been intercepted
exports.SNOOPER_TOR = "tor"; // A player has joined or used the tor network
exports.SNOOPER_WIRETAP = "wiretap"; // A wiretap has been put in place

exports.STORYTELLER_ALLEGIANCE = "allegiance"; // Change allegiance / Set allegiance
exports.STORYTELLER_ANNOUNCEMENT = "announcement"; // Make an announcement
exports.STORYTELLER_END = "end"; // End the game
exports.STORYTELLER_HEARTBEAT = "heartbeat"; // Announce a heartbeat
exports.STORYTELLER_INVESTIGATE = "investigate"; // look into an issue
exports.STORYTELLER_KILL = "kill"; // A player has been killed
exports.STORYTELLER_JOIN = "join"; // Join a game / someone has joined
exports.STORYTELLER_LEAVE = "leave"; // Leave a game / someone has left
exports.STORYTELLER_ROLE = "setrole"; // Specify role preference / Set role
exports.STORYTELLER_RUMOR = "rumor"; // Give the person a rumor
exports.STORYTELLER_START = "start"; // The game has started 
exports.STORYTELLER_TICK = "tick"; // Trigger a tick / announce a tick

exports.TOR_CONNECT = "connect"; // Connect to Tor
exports.TOR_DISCONNECT = "disconnect"; // Disconnect from Tor
exports.TOR_ROUTE = "route"; // Send a package to be routed through Tor
exports.TOR_EDUCATION = "tor education" // Teach a player about the Tor network