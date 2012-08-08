var Game = Class.extend({
	id: "",
	name: "",
	isPassword: null,
	password: "",
	players: {},
	
	init: function() {
	},
	
	render: function(output) {
		output.empty();
		
		var outputName = $('<div />')
			.addClass('name')
			.text(this.name)
			.appendTo(output);
		
		if(this.isPassword) {
			var outputPrivate = $('<div />')
				.addClass('game-badge')
				.addClass('private')
				.appendTo(output);
		}
	}
});