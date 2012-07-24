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