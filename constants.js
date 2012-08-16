if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

exports.COMMUNICATION_EMAIL_PAYLOAD_EMAIL = "email";

exports.COMMUNICATION_IRC_PAYLOAD_BROADCAST = "broadcast";
exports.COMMUNICATION_IRC_PAYLOAD_JOIN = "join";
exports.COMMUNICATION_IRC_PAYLOAD_LEAVE = "leave";

exports.COMMUNICATION_STORYTELLER_PAYLOAD_ERROR = "error"; // Something went wrong
exports.COMMUNICATION_STORYTELLER_PAYLOAD_JOIN = "join"; // Join a game / someone has joined
exports.COMMUNICATION_STORYTELLER_PAYLOAD_LEAVE = "leave"; // Leave a game / someone has left
exports.COMMUNICATION_STORYTELLER_PAYLOAD_READY = "ready"; // Ready to start / someone is ready to start
exports.COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE = "setallegiance"; // Change allegiance / Set allegiance
exports.COMMUNICATION_STORYTELLER_PAYLOAD_ROLE = "setrole"; // Specify role preference / Set role
exports.COMMUNICATION_STORYTELLER_PAYLOAD_START = "start"; // The game has started 

exports.COMMUNICATION_LOBBY_PAYLOAD_CONNECT = "connect" // Connect to the lobby / you have connected
exports.COMMUNICATION_LOBBY_PAYLOAD_CREATE = "create"; // Create a new game / a new game was created
exports.COMMUNICATION_LOBBY_PAYLOAD_ERROR = "error"; // Something went wrong
exports.COMMUNICATION_LOBBY_PAYLOAD_JOIN = "join"; // Join a game from the lobby / Someone has joined a game from the lobby

exports.COMMUNICATION_SOCKET_SERVER = "server"; // allows the server to communicate with itself

exports.COMMUNICATION_TARGET_EMAIL = "email";
exports.COMMUNICATION_TARGET_STORYTELLER = "storyteller";
exports.COMMUNICATION_TARGET_IRC = "irc";
exports.COMMUNICATION_TARGET_LOBBY = "lobby";
exports.COMMUNICATION_TARGET_NEWSPAPER = "newspaper";
exports.COMMUNICATION_TARGET_TOR = "tor";

// Message Types
exports.MESSAGE_IRC_SYSTEM_TYPE_JOIN = "join";
exports.MESSAGE_IRC_SYSTEM_TYPE_LEAVE = "leave";

// Player Allegiances
exports.PLAYER_ALLEGIANCE_ACTIVIST = "A";
exports.PLAYER_ALLEGIANCE_GOVERNMENT = "G";
exports.PLAYER_ALLEGIANCE_NEUTRAL = "N";
exports.PLAYER_ALLEGIANCE_UNKNOWN = "U";

// Player Roles
exports.PLAYER_ROLE_ACTIVIST = "A";
exports.PLAYER_ROLE_CITIZEN = "C";
exports.PLAYER_ROLE_CITIZEN_ACTIVIST = "CA";
exports.PLAYER_ROLE_CITIZEN_SPY = "CS";
exports.PLAYER_ROLE_EDITOR = "E";
exports.PLAYER_ROLE_JOURNALIST = "J";
exports.PLAYER_ROLE_SPY = "S";
exports.PLAYER_ROLE_UNKNOWN = "U";

// Viewport Types
exports.VIEWPORT_PLAYER_STORYTELLER = "S";
exports.VIEWPORT_PLAYER_LOBBY = "L";