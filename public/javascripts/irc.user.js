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
				.addClass('user');
			
			switch(viewport.type) {
				case VIEWPORT_IRC_USER_USERLIST:
					var userName = $('<div />')
						.addClass('name')
						.attr('id', this.nick)
						.text(this.nick)
						.appendTo(output);
					
					break;
			}
		}
	}
});