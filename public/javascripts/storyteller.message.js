var StorytellerMessage = Visible.extend({
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
				case VIEWPORT_STORYTELLER_ANNOUNCEMENTPANE:
					var announcementCopy = $('<div />')
						.addClass('text')
						.text(this.text)
						.appendTo(output);
					
					break;
				}
		}
	}
});