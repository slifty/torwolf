if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

exports.COMMUNICATION_EMAIL_PAYLOAD_EMAIL = "email";
exports.COMMUNICATION_EMAIL_PAYLOAD_REGISTER = "register";
exports.COMMUNICATION_EMAIL_PAYLOAD_SEND = "send";

exports.COMMUNICATION_GENERAL_PAYLOAD_ERROR = "error";

exports.COMMUNICATION_IRC_PAYLOAD_CONNECT = "connect";
exports.COMMUNICATION_IRC_PAYLOAD_ERROR = "error";
exports.COMMUNICATION_IRC_PAYLOAD_MESSAGE = "message";
exports.COMMUNICATION_IRC_PAYLOAD_JOIN = "join";
exports.COMMUNICATION_IRC_PAYLOAD_LEAVE = "leave";
exports.COMMUNICATION_IRC_PAYLOAD_NICK = "switch nick";

exports.COMMUNICATION_LOBBY_PAYLOAD_CONNECT = "connect" // Connect to the lobby / you have connected
exports.COMMUNICATION_LOBBY_PAYLOAD_CREATE = "create"; // Create a new game / a new game was created
exports.COMMUNICATION_LOBBY_PAYLOAD_JOIN = "join"; // Join a game from the lobby / Someone has joined a game from the lobby

exports.COMMUNICATION_NEWSPAPER_PAYLOAD_PUBLISH = "publish"; // Print a paper / send a printed paper

exports.COMMUNICATION_PROXY_NONE = "none";
exports.COMMUNICATION_PROXY_TOR = "tor";

exports.COMMUNICATION_SOCKET_SERVER = "server"; // allows the server to communicate with itself
exports.COMMUNICATION_SOCKET_TOR = "tor"; // allows tor to send anonymous messages

exports.COMMUNICATION_SNOOPER_PAYLOAD_INTERCEPT = "intercept"; // Intercept a message / Send an intercepted message
exports.COMMUNICATION_SNOOPER_PAYLOAD_SSL = "ssl"; // Intercept an SSL message / Send an intercepted SSL message
exports.COMMUNICATION_SNOOPER_PAYLOAD_TOR = "tor"; // alert the agent of tor use
exports.COMMUNICATION_SNOOPER_PAYLOAD_WIRETAP = "wiretap"; // Trigger a wiretap / Confirm a wiretap

exports.COMMUNICATION_STORYTELLER_PAYLOAD_ALLEGIANCE = "allegiance"; // Change allegiance / Set allegiance
exports.COMMUNICATION_STORYTELLER_PAYLOAD_ANNOUNCEMENT = "announcement"; // Make an announcement
exports.COMMUNICATION_STORYTELLER_PAYLOAD_HEARTBEAT = "heartbeat"; // Trigger a heartbeat / announce a heartbeat
exports.COMMUNICATION_STORYTELLER_PAYLOAD_INVESTIGATE = "investigate"; // look into an issue
exports.COMMUNICATION_STORYTELLER_PAYLOAD_JOIN = "join"; // Join a game / someone has joined
exports.COMMUNICATION_STORYTELLER_PAYLOAD_LEAVE = "leave"; // Leave a game / someone has left
exports.COMMUNICATION_STORYTELLER_PAYLOAD_ROLE = "setrole"; // Specify role preference / Set role
exports.COMMUNICATION_STORYTELLER_PAYLOAD_RUMOR = "rumor"; // Give the person a rumor
exports.COMMUNICATION_STORYTELLER_PAYLOAD_START = "start"; // The game has started 
exports.COMMUNICATION_STORYTELLER_PAYLOAD_TICK = "tick"; // Trigger a tick / announce a tick

exports.COMMUNICATION_TARGET_EMAIL = "email";
exports.COMMUNICATION_TARGET_IRC = "irc";
exports.COMMUNICATION_TARGET_LOBBY = "lobby";
exports.COMMUNICATION_TARGET_NEWSPAPER = "newspaper";
exports.COMMUNICATION_TARGET_SNOOPER = "snooper";
exports.COMMUNICATION_TARGET_STORYTELLER = "storyteller";
exports.COMMUNICATION_TARGET_TOR = "tor";

exports.COMMUNICATION_TOR_PAYLOAD_BRIDGE = "bridge"; // Create a tor bridge, register tor bridge with player
exports.COMMUNICATION_TOR_PAYLOAD_CONNECT = "connect"; // Connect to Tor
exports.COMMUNICATION_TOR_PAYLOAD_DISCONNECT = "disconnect"; // Disconnect from Tor
exports.COMMUNICATION_TOR_PAYLOAD_ROUTE = "route"; // Send a package to be routed through Tor

exports.IRC_MESSAGE_TYPE_ACTION = "A";
exports.IRC_MESSAGE_TYPE_JOIN = "J";
exports.IRC_MESSAGE_TYPE_MESSAGE = "M";
exports.IRC_MESSAGE_TYPE_NICK = "N";
exports.IRC_MESSAGE_TYPE_SYSTEM = "S";

exports.LOCALE_DEFAULT = "default";

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

exports.SNOOPER_MESSAGE_INBOUND = "I";
exports.SNOOPER_MESSAGE_OUTBOUND = "O";
exports.SNOOPER_TOR_ENABLED = "Y";
exports.SNOOPER_TOR_DISABLED = "N";

exports.TICK_WARNING = 50000; // Number of milliseconds warning to give before ending the turn
exports.TICK_HEARTBEAT = 10000; // How many milliseconds between each heartbeat

exports.VIEWPORT_EMAIL_ACCOUNTLIST = "email-account-accountlist";
exports.VIEWPORT_EMAIL_ADDRESSLIST = "email-account-addresslist";
exports.VIEWPORT_EMAIL_FROM = "email-input-from";
exports.VIEWPORT_EMAIL_MESSAGELIST = "email-message-list"
exports.VIEWPORT_IRC_MESSAGELIST = "irc-message-list";
exports.VIEWPORT_IRC_USERLIST = "irc-user-list";
exports.VIEWPORT_LOBBY_GAMELIST = "lobby-gamelist";
exports.VIEWPORT_NEWSPAPER_ARCHIVEPANE = "newspaper-archivepane";
exports.VIEWPORT_SNOOPER_MESSAGELIST = "snooper-messagelist";
exports.VIEWPORT_STORYTELLER_ANNOUNCEMENTPANE = "storyteller-announcementpane";
exports.VIEWPORT_STORYTELLER_PEERPANE = "storyteller-peerpane";
exports.VIEWPORT_STORYTELLER_PLAYERPANE = "storyteller-playerpane";
exports.VIEWPORT_STORYTELLER_RUMORPANE = "storyteller-rumorpane";
