var IrcUser = Visible.extend({
	init: function() {
		this._super();
		
		this.nick = "";
		this.id = "";
		this.player = null;
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('nick')
				.addClass('user' + this.nick);
			
			switch(viewport.type) {
				case VIEWPORT_IRC_USER_USERLIST:
					var userName = $('<div />')
						.addClass('name')
						.text(this.nick)
						.appendTo(output);
					
					break;
			}
		}
	}
});