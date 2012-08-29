if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

exports.COMMUNICATION_EMAIL_PAYLOAD_EMAIL = "email";

exports.COMMUNICATION_IRC_PAYLOAD_BROADCAST = "broadcast";
exports.COMMUNICATION_IRC_PAYLOAD_JOIN = "join";
exports.COMMUNICATION_IRC_PAYLOAD_LEAVE = "leave";


exports.COMMUNICATION_LOBBY_PAYLOAD_CONNECT = "connect" // Connect to the lobby / you have connected
exports.COMMUNICATION_LOBBY_PAYLOAD_CREATE = "create"; // Create a new game / a new game was created
exports.COMMUNICATION_LOBBY_PAYLOAD_ERROR = "error"; // Something went wrong
exports.COMMUNICATION_LOBBY_PAYLOAD_JOIN = "join"; // Join a game from the lobby / Someone has joined a game from the lobby

exports.COMMUNICATION_NEWSPAPER_PAYLOAD_PUBLISH = "publish"; // Print a paper / send a printed paper

exports.COMMUNICATION_SOCKET_SERVER = "server"; // allows the server to communicate with itself

exports.COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE = "allegiance"; // Change allegiance / Set allegiance
exports.COMMUNICATION_STORYTELLER_PAYLOAD_ANNOUNCEMENT = "announcement"; // Make an announcement
exports.COMMUNICATION_STORYTELLER_PAYLOAD_ERROR = "error"; // Something went wrong
exports.COMMUNICATION_STORYTELLER_PAYLOAD_HEARTBEAT = "heartbeat"; // Trigger a heartbeat / announce a heartbeat
exports.COMMUNICATION_STORYTELLER_PAYLOAD_INVESTIGATE = "investigate"; // look into an issue
exports.COMMUNICATION_STORYTELLER_PAYLOAD_JOIN = "join"; // Join a game / someone has joined
exports.COMMUNICATION_STORYTELLER_PAYLOAD_LEAVE = "leave"; // Leave a game / someone has left
exports.COMMUNICATION_STORYTELLER_PAYLOAD_ROLE = "setrole"; // Specify role preference / Set role
exports.COMMUNICATION_STORYTELLER_PAYLOAD_RUMOR = "rumor"; // Give the person a rumor
exports.COMMUNICATION_STORYTELLER_PAYLOAD_START = "start"; // The game has started 
exports.COMMUNICATION_STORYTELLER_PAYLOAD_TICK = "tick"; // Trigger a tick / announce a tick

exports.COMMUNICATION_TARGET_EMAIL = "email";
exports.COMMUNICATION_TARGET_STORYTELLER = "storyteller";
exports.COMMUNICATION_TARGET_IRC = "irc";
exports.COMMUNICATION_TARGET_LOBBY = "lobby";
exports.COMMUNICATION_TARGET_NEWSPAPER = "newspaper";
exports.COMMUNICATION_TARGET_TOR = "tor";

exports.LOCALE_DEFAULT = "default";

// Message Types
exports.MESSAGE_IRC_SYSTEM_TYPE_JOIN = "join";
exports.MESSAGE_IRC_SYSTEM_TYPE_LEAVE = "leave";

// Player Attributes
exports.PLAYER_ALLEGIANCE_GOVERNMENT = "G";
exports.PLAYER_ALLEGIANCE_NEUTRAL = "N";
exports.PLAYER_ALLEGIANCE_REBELLION = "R";
exports.PLAYER_ALLEGIANCE_UNKNOWN = "U";

exports.PLAYER_ROLE_ACTIVIST = "A";
exports.PLAYER_ROLE_CITIZEN = "C";
exports.PLAYER_ROLE_CITIZEN_ACTIVIST = "CA";
exports.PLAYER_ROLE_CITIZEN_SPY = "CS";
exports.PLAYER_ROLE_EDITOR = "E";
exports.PLAYER_ROLE_JOURNALIST = "J";
exports.PLAYER_ROLE_SPY = "S";
exports.PLAYER_ROLE_UNKNOWN = "U";

exports.PLAYER_STATUS_ALIVE = "A";
exports.PLAYER_STATUS_DEAD = "D";

exports.RUMOR_INVESTIGATIONSTATUS_INVESTIGATING = "I";
exports.RUMOR_INVESTIGATIONSTATUS_NONE = "N";
exports.RUMOR_TRUTHSTATUS_TRUE = "T";
exports.RUMOR_TRUTHSTATUS_FALSE = "F";
exports.RUMOR_TRUTHSTATUS_UNKNOWN = "U";
exports.RUMOR_PUBLICATIONSTATUS_PUBLISHED = "P";
exports.RUMOR_PUBLICATIONSTATUS_UNPUBLISHED = "U";
exports.RUMOR_SOURCE_SYSTEM = "S";
exports.RUMOR_SOURCE_NEWSPAPER = "N";

exports.TICK_WARNING = 10000; // Number of milliseconds warning to give before ending the turn
exports.TICK_HEARTBEAT = 1000; // How many milliseconds between each heartbeat

// Viewport Types
exports.VIEWPORT_ANNOUNCEMENT_STORYTELLER_ANNOUNCEMENTPANE = "storyteller-announcementpane";
exports.VIEWPORT_EDITION_NEWSPAPER_ARCHIVEPANE = "newspaper-archivepane";
exports.VIEWPORT_GAME_LOBBY_GAMELIST = "lobby-gamelist";
exports.VIEWPORT_PLAYER_STORYTELLER_PEERPANE = "storyteller-peerpane";
exports.VIEWPORT_PLAYER_STORYTELLER_PLAYERPANE = "storyteller-playerpane";
exports.VIEWPORT_RUMOR_STORYTELLER_RUMORPANE = "storyteller-rumorpane";