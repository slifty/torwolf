var SnooperMessage = Visible.extend({
	init: function() {
		this._super();
		
		this.player = null;
		this.payload = null;
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('player-' + this.sender.player.id)
				.addClass('type-' + this.type)
				.addClass('message');
			
			switch(viewport.type) {
				case VIEWPORT_IRC_MESSAGE_MESSAGELIST:
					switch(this.type) {
						case IRC_MESSAGE_TYPE_ACTION:
							var messageNick = $('<div />')
								.addClass('nick')
								.text('* ' + this.sender.nick + ' ')
								.appendTo(output);
							
							var messageContent = $('<div />')
								.addClass('text')
								.text(this.text)
								.appendTo(output);
							break;
						case IRC_MESSAGE_TYPE_MESSAGE:
							var messageNick = $('<div />')
								.addClass('nick')
								.text('<' + this.sender.nick + '> ')
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