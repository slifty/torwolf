var Game = Class.extend({
	
	init: function() {
		this.id = "";
		this.name = "";
		this.isPrivate = null;
		this.password = "";
		this.players = {};
	},
	
	render: function(output) {
		output.empty();
		
		var outputName = $('<div />')
			.addClass('name')
			.text(this.name)
			.appendTo(output);
		
		if(this.isPrivate) {
			var outputPrivate = $('<div />')
				.addClass('game-badge')
				.addClass('private')
				.appendTo(output);
		}
	}
});