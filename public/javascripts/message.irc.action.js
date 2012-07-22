MESSAGE_IRC_SYSTEM_TYPE_JOIN = "join";
MESSAGE_IRC_SYSTEM_TYPE_LEAVE = "leave";

var IRCActionMessage = Message.extend({
	type: "",
	target: null,
	
	render: function(output) {
		output.empty();
		
		var outputContent = $('<div />');
		outputContent.addClass('content');
		output.append(outputContent);
		
		outputContent.text(" * ");
		
		var outputTarget = $('<span />');
		outputName.addClass('name');
		outputName.addClass('irc-user-' + this.sender.id);
		outputName.addClass('player-' + this.sender.player.id);
		outputName.text(this.sender.alias);
		outputContent.append(outputName);
		outputContent.append(" has ");
		
		var outputAction = $('<span />');
		outputAction.addClass('action');
		switch(this.action) {
			case MESSAGE_IRC_SYSTEM_TYPE_JOIN:
				outputAction.text("joined the channel");
				break;
			case MESSAGE_IRC_SYSTEM_TYPE_LEAVE:
				outputAction.text("left the channel");
				break;
		}
		outputContent.append(outputAction);
		outputContent.append(".");
	}
});