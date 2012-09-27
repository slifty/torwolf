var IrcMessage = Visible.extend({
	init: function() {
		this._super();
		
		this.destination = "";
		this.sender = null;
		this.text = "";
		this.type = "";
	},
	
	redraw: function() {
		var nick = this.sender?this.sender.nick:localization[LOCALE].messages.snooper.MISSINGNO;
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('user-' + this.sender?this.sender.id:"")
				.addClass('type-' + this.type)
				.addClass('message');
			
			switch(viewport.type) {
				case VIEWPORT_SNOOPER_MESSAGELIST:
				case VIEWPORT_IRC_MESSAGELIST:
					switch(this.type) {
						case IRC_MESSAGE_TYPE_ACTION:
							var messageNick = $('<div />')
								.addClass('nick')
								.text('* ' + nick + ' ')
								.appendTo(output);
							
							var messageContent = $('<div />')
								.addClass('text')
								.text(this.text)
								.appendTo(output);
							break;
						case IRC_MESSAGE_TYPE_JOIN:
							var messageNick = $('<div />')
								.addClass('nick')
								.text('+ ' + nick + ' ')
								.appendTo(output);
								
							var messageContent = $('<div />')
								.addClass('text')
								.text(this.text)
								.appendTo(output);
							break;
						case IRC_MESSAGE_TYPE_MESSAGE:
							var messageNick = $('<div />')
								.addClass('nick')
								.text('<' + nick + '> ')
								.appendTo(output);
								
							var messageContent = $('<div />')
								.addClass('text')
								.text(this.text)
								.appendTo(output);
							break;
						case IRC_MESSAGE_TYPE_SYSTEM:
							var messageNick = $('<div />')
								.addClass('nick')
								.text('+ ')
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