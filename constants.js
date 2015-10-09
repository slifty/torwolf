if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

exports.COMMUNICATION_SOCKET_SERVER = "server"; // allows the server to communicate with itself

exports.TICK_WARNING = 50000; // Number of milliseconds warning to give before ending the turn
exports.TICK_HEARTBEAT = 10000; // How many milliseconds between each heartbeat

exports.COMMUNICATION_TARGET_EMAIL = "email";
exports.COMMUNICATION_TARGET_IRC = "irc";
exports.COMMUNICATION_TARGET_LOBBY = "lobby";
exports.COMMUNICATION_TARGET_NEWSPAPER = "newspaper";
exports.COMMUNICATION_TARGET_SNOOPER = "snooper";
exports.COMMUNICATION_TARGET_STORYTELLER = "storyteller";
exports.COMMUNICATION_TARGET_TOR = "tor";

exports.LOCALE_DEFAULT = "default";
