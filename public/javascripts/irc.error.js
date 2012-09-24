var IrcError = Visible.extend({
	init: function() {
		this._super();
		
		this.text = "";
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('message');
				
			switch(viewport.type) {
				case VIEWPORT_IRC_MESSAGE_MESSAGELIST:
					var messageContent = $('<div />')
						.addClass('errorText')
						.text(this.text)
						.appendTo(output);	
				default:
				break;
			}
				
		}
	}
});