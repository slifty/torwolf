var IrcErrorMessage = Visible.extend({
	init: function() {
		this._super();
		
		this.type = "";
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
					switch(this.type) {
						case IRC_MESSAGE_TYPE_ERROR: 
						var messageContent = $('<div />')
							.addClass('errorText')
							.text(this.text)
							.appendTo(output)
						break;
					}
				break;
				
				default:
				break;
			}
				
		}
	}
});