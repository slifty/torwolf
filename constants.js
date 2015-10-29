if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

exports.COMMUNICATION_SOCKET_SERVER = "server"; // allows the server to communicate with itself

exports.TICK_WARNING = 20000; // Number of milliseconds warning to give before ending the turn
exports.TICK_HEARTBEAT = 10000; // How many milliseconds between each heartbeat
exports.TICK_LENGTH = 60000; // interval between ticks
exports.TICK_EMAILSUBPOENA = 8; // email is subpoena'd on the eighth tick
exports.TICK_IRCSUBPOENA = 3; // irc is subpoena'd on the third tick

exports.COMMUNICATION_TARGET_EMAIL = "email";
exports.COMMUNICATION_TARGET_IRC = "irc";
exports.COMMUNICATION_TARGET_LOBBY = "lobby";
exports.COMMUNICATION_TARGET_NEWSPAPER = "newspaper";
exports.COMMUNICATION_TARGET_SNOOPER = "snooper";
exports.COMMUNICATION_TARGET_STORYTELLER = "storyteller";
exports.COMMUNICATION_TARGET_TOR = "tor";

exports.PLAYER_ALLEGIANCE_GOVERNMENT = "G";
exports.PLAYER_ALLEGIANCE_NEUTRAL = "N";
exports.PLAYER_ALLEGIANCE_REBELLION = "R";
exports.PLAYER_ALLEGIANCE_UNKNOWN = "U";

exports.PLAYER_ROLE_ACTIVIST = "ACTIVIST";
exports.PLAYER_ROLE_CITIZEN_APATHETIC = "APATHETIC_CIVILIAN";
exports.PLAYER_ROLE_CITIZEN_ACTIVIST = "REBELLION_CIVILIAN";
exports.PLAYER_ROLE_CITIZEN_AGENT = "GOVERNMENT_CIVILIAN";
exports.PLAYER_ROLE_JOURNALIST = "JOURNALIST";
exports.PLAYER_ROLE_AGENT = "AGENT";

exports.RUMOR_INVESTIGATIONSTATUS_INVESTIGATING = "I";
exports.RUMOR_INVESTIGATIONSTATUS_NONE = "N";
exports.RUMOR_TRUTHSTATUS_TRUE = "T";
exports.RUMOR_TRUTHSTATUS_FALSE = "F";
exports.RUMOR_TRUTHSTATUS_UNKNOWN = "U";
exports.RUMOR_PUBLICATIONSTATUS_PUBLISHED = "P";
exports.RUMOR_PUBLICATIONSTATUS_UNPUBLISHED = "U";
exports.RUMOR_SOURCE_SYSTEM = "S";
exports.RUMOR_SOURCE_NEWSPAPER = "N";

exports.LOCALE_DEFAULT = "default";
