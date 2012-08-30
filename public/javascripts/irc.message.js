var IrcMessage = Visible.extend({
	init: function() {
		this._super();
		
		this.destination = "";
		this.sender = null;
		this.text = "";
		this.type = "";
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('user-' + this.sender.id)
				.addClass('player-' + this.sender.player.id)
				.addClass('type-' + this.type)
				.addClass('message');
			
			switch(viewport.type) {
				case VIEWPORT_IRC_MESSAGE_MESSAGELIST:
					switch(this.type) {
						case IRC_MESSAGE_TYPE_ACTION:
							var messageAlias = $('<div />')
								.addClass('alias')
								.text('* ' + this.sender.alias + ' ')
								.appendTo(output);
							
							var messageContent = $('<div />')
								.addClass('text')
								.text(this.text)
								.appendTo(output);
							break;
						case IRC_MESSAGE_TYPE_BROADCAST:
							var messageAlias = $('<div />')
								.addClass('alias')
								.text('<' + this.sender.alias + '> ')
								.appendTo(output);
					
							var messageContent = $('<div />')
								.addClass('text')
								.text(this.text)
								.appendTo(output);
							break;
						case IRC_MESSAGE_TYPE_SYSTEM:
							var messageAlias = $('<div />')
								.addClass('alias')
								.text('+ ' + this.sender.alias + ' ')
								.appendTo(output);
							
							var messageContent = $('<div />')
								.addClass('text')
								.text(this.text)
								.appendTo(output);
							break;
					}
					break;
				}
		}
	}
});