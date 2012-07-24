if(exports == undefined) var exports = window;

// Email
exports.COMMUNICATION_TARGET_EMAIL = "email";
exports.COMMUNICATION_EMAIL_PAYLOAD_EMAIL = "email";

// IRC
exports.COMMUNICATION_TARGET_IRC = "irc";
exports.COMMUNICATION_IRC_PAYLOAD_BROADCAST = "broadcast";
exports.COMMUNICATION_IRC_PAYLOAD_JOIN = "join";
exports.COMMUNICATION_IRC_PAYLOAD_LEAVE = "leave";
exports.MESSAGE_IRC_SYSTEM_TYPE_JOIN = "join";
exports.MESSAGE_IRC_SYSTEM_TYPE_LEAVE = "leave";

// Game
exports.COMMUNICATION_TARGET_GAME = "game";
exports.COMMUNICATION_GAME_PAYLOAD_ERROR = "error"; // Something went wrong
exports.COMMUNICATION_GAME_PAYLOAD_CREATE = "create"; // Create a new game / a new game was created
exports.COMMUNICATION_GAME_PAYLOAD_LISTGAMES = "listgames"; // Get a list of active games / a list of active games
exports.COMMUNICATION_GAME_PAYLOAD_JOIN = "join"; // Join a game / someone has joined
exports.COMMUNICATION_GAME_PAYLOAD_LEAVE = "leave"; // Leave a game / someone has left
exports.COMMUNICATION_GAME_PAYLOAD_READY = "ready"; // Ready to start / someone is ready to start
exports.COMMUNICATION_GAME_PAYLOAD_START = "start"; // The game has started 
exports.COMMUNICATION_GAME_PAYLOAD_SETROLE = "setrole"; // Specify role preference / Set role
exports.COMMUNICATION_GAME_PAYLOAD_SETALLEGIANCE = "setallegiance"; // Change allegiance / Set allegiance

// Tor
exports.COMMUNICATION_TARGET_TOR = "tor";

// Newspaper
exports.COMMUNICATION_TARGET_NEWSPAPER = "newspaper";

// Player
exports.PLAYER_ROLE_JOURNALIST = "J";
exports.PLAYER_ROLE_CITIZEN = "C";
exports.PLAYER_ROLE_ACTIVIST = "A";
exports.PLAYER_ROLE_EDITOR = "E";
exports.PLAYER_ROLE_SPY = "S";
exports.PLAYER_ROLE_UNKNOWN = "U";
exports.PLAYER_ALLEGIANCE_NEUTRAL = "N";
exports.PLAYER_ALLEGIANCE_ACTIVIST = "A";
exports.PLAYER_ALLEGIANCE_GOVERNMENT = "G";
exports.PLAYER_ALLEGIANCE_UNKNOWN = "U";