if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

exports.EMAIL_REGISTER = "register"; // Create a new email account
exports.EMAIL_REGISTERED = "registered"; // A new email account has been created
exports.EMAIL_SEND = "send"; // Send an email
exports.EMAIL_SENT = "sent"; // An email has been sent

exports.GENERAL_DEACTIVATE = "deactivate"; // Deactivate torwolf?
exports.GENERAL_ACTIVATE = "activate"; // Activate torwolf?
exports.GENERAL_ERROR = "error"; // An error has occurred

exports.IRC_CONNECT = "connect"; // Connect to IRC
exports.IRC_CONNECTED = "connected"; // A player has connected to IRC
exports.IRC_DISCONNECT = "disconnect" // Disconnect from IRC
exports.IRC_DISCONNECTED = "disconnected" // A player has disconnected from IRC
exports.IRC_MESSAGE = "message"; // Send an IRC message
exports.IRC_MESSAGED = "messaged"; // An IRC message has been sent
exports.IRC_JOIN = "join-irc"; // Join an IRC channel
exports.IRC_JOINED = "joined-irc"; // A player has joined an IRC channel
exports.IRC_LEAVE = "leave-irc"; // Leave an IRC channel
exports.IRC_LEFT = "left-irc"; // A player has left an IRC channel
exports.IRC_SWITCHNICK = "switch nick"; // switch IRC nicks
exports.IRC_NICKSWITCHED = "nick switched"; // A player has switched IRC nicks

exports.LOBBY_CONNECT = "connect" // Connect to the lobby
exports.LOBBY_CONNECTED = "connected" // A player has connected to the lobby
exports.LOBBY_CREATE = "create"; // Create a new game
exports.LOBBY_CREATED = "created"; // A new game has been created
exports.LOBBY_JOINED = "joined"; // A player has joined the lobby
exports.LOBBY_JOIN = "join"; // Join a lobby

exports.NEWSPAPER_PUBLISH = "publish"; // Publish a paper
exports.NEWSPAPER_PUBLISHED = "published"; // A paper has been published

exports.SNOOPER_INTERCEPT = "intercept"; // TODO: what is this message responsible for?
exports.SNOOPER_INTERCEPTED = "intercepted"; // A plaintext message has been intercepted
exports.SNOOPER_SSL = "ssl"; // TODO: what is this message responsible for?
exports.SNOOPER_SSLED = "ssl"; // An encrypted message has been intercepted
exports.SNOOPER_TOR = "tor"; // TODO: what is this message responsible for?
exports.SNOOPER_TORRED = "tored"; // A player has joined or used the tor network
exports.SNOOPER_WIRETAP = "wiretap"; // Put a wiretap into place
exports.SNOOPER_WIRETAPPED = "wiretapped"; // A wiretap has been put in place

exports.STORYTELLER_ALLEGIANCE = "allegiance"; // Change allegiance / Set allegiance
exports.STORYTELLER_ALLEGIANCECHANGE = "allegiance-change"; // An allegiance has been changed
exports.STORYTELLER_ANNOUNCE = "announce"; // Make an announcement
exports.STORYTELLER_ANNOUNCEMENT = "announcement-sent"; // An announcement has been made
exports.STORYTELLER_END = "end"; // End the game
exports.STORYTELLER_ENDED = "ended"; // The game has ended
exports.STORYTELLER_HEARTBEATPING = "heartbeat-ping"; // Send a heartbeat
exports.STORYTELLER_HEARTBEATPONG = "heartbeat-pong"; // Respond to a heartbeat
exports.STORYTELLER_INVESTIGATED = "investigated"; // An issue has been investigated
exports.STORYTELLER_INVESTIGATE = "investigate"; // Investigate an issue
exports.STORYTELLER_KILL = "kill"; // Kill a player
exports.STORYTELLER_KILLED = "killed"; // A player has been killed
exports.STORYTELLER_JOIN = "join"; // Join a game
exports.STORYTELLER_JOINED = "joined"; // Someone has joined the game
exports.STORYTELLER_LEAVE = "leave"; // Leave a game
exports.STORYTELLER_LEFT = "left"; // Someone has left the game
exports.STORYTELLER_SETROLE = "set-role"; // Set a preferred role
exports.STORYTELLER_ROLESET = "role-set"; // A preferred role has been set
exports.STORYTELLER_RUMOR = "rumor"; // Give the person a rumor
exports.STORYTELLER_RUMORRECEIVED = "rumor-received"; // A rumor has been received
exports.STORYTELLER_START = "start"; // Start the game
exports.STORYTELLER_STARTED = "started"; // The game has started
exports.STORYTELLER_TICK = "tick"; // Trigger a tick
exports.STORYTELLER_TOCK = "tock"; // A tick has occurred
exports.STORYTELLER_IRCSUBPOENA = "subpoena-irc"; // subpoena irc server
exports.STORYTELLER_IRCSUBPOENAD = "subpoenad-irc"; // irc server has been subpoena'd
exports.STORYTELLER_EMAILSUBPOENA = "subpoena-email"; // subpoena email server
exports.STORYTELLER_EMAILSUBPOENAD = "subpoenad-email"; // email server has been subpoena'd

exports.TOR_CONNECT = "connect"; // Connect to Tor
exports.TOR_CONNECTED = "connected"; // Connection to Tor complete
exports.TOR_DISCONNECT = "disconnect"; // Disconnect from Tor
exports.TOR_DISCONNECTED = "disconnected"; // Disconnection from Tor complete
exports.TOR_ROUTE = "route"; // Send a package to be routed through Tor
exports.TOR_ROUTED = "routed"; // A package has been routed through Tor
exports.TOR_EDUCATE = "tor-educate" // Teach a player about the Tor network
exports.TOR_EDUCATED = "tor-educated" // A player has been taught about Tor
