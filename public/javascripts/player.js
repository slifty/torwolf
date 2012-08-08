var Player = Class.extend({
	id: "",
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
		
		var outputId = $('<div />');
		outputId.addClass('id');
		outputId.addClass('user-' + this.id);
		outputId.text(this.id);
		output.append(outputId);
	}
	
});