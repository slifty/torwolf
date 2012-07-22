var PLAYER_ROLE_JOURNALIST = "J";
var PLAYER_ROLE_CITIZEN = "C";
var PLAYER_ROLE_ACTIVIST = "A";
var PLAYER_ROLE_EDITOR = "E";
var PLAYER_ROLE_SPY = "S";
var PLAYER_ROLE_UNKNOWN = "U";

var PLAYER_ALLEGIANCE_NEUTRAL = "N";
var PLAYER_ALLEGIANCE_ACTIVIST = "A";
var PLAYER_ALLEGIANCE_GOVERNMENT = "G";
var PLAYER_ALLEGIANCE_UNKNOWN = "U";

var Player = Class.extend({
	id: 0,
	alive: true,
	name: "",
	role: "",
	allegiance: "",
	secrets: [],
	
	init: function() {
	},
	
	render: function(output) {
		output.empty();
		
		var outputName = $('<div />');
		outputName.addClass('name');
		outputName.addClass('user-' + this.id);
		outputName.text(this.name);
		output.append(outputName);
	}
	
});