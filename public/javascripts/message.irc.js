var IRCMessage = Message.extend({
	destination: "",
	sender: null,
	
	render: function(output) {
		output.empty();
		
		var outputName = $('<div />');
		outputName.addClass('name');
		outputName.addClass('irc-user-' + this.sender.id);
		outputName.addClass('player-' + this.sender.player.id);
		outputName.text('<' + this.sender.alias + '>');
		output.append(outputName);
		
		var outputContent = $('<div />');
		outputContent.addClass('content');
		outputContent.text(this.content);
		output.append(outputContent);
	}
});