if(typeof(window) != "undefined") {
	window.LOCALE = (navigator.language)?navigator.language:navigator.userLanguage;
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = '/locales/' + window.LOCALE + '.js';
	$("head").append(script);
	
	if(!(LOCALE in localization))
		localization[LOCALE] = localization["default"];
} else {
	// Todo: include every file in locales/ dynamically
	exports.localization = {};
	exports["en"] = require("./locales/default.js").localization["default"];
}