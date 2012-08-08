var IRCMessage = Message.extend({
	destination: "",
	sender: null,
	
	render: function(output) {
		output.empty();
		
		var outputName = $('<div />')
			.addClass('name')
			.addClass('irc-user-' + this.sender.id)
			.addClass('player-' + this.sender.player.id)
			.text('<' + this.sender.alias + '>')
			.appendTo(output);
		
		var outputContent = $('<div />')
			.addClass('content')
			.text(this.content)
			.appendTo(output);
	}
});