var NewspaperMessage = Visible.extend({
	init: function() {
		this._super();
		
		this.headline = "";
		this.copy = "";
		this.round = 0;
		this.rumor = null;
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('edition');
			
			switch(viewport.type) {
				case VIEWPORT_EDITION_NEWSPAPER_ARCHIVEPANE:
					var editionRound = $('<div />')
						.addClass('round')
						.text(this.round)
						.appendTo(output);
					
					var editionHeadline = $('<div />')
						.addClass('headline')
						.text(this.headline)
						.appendTo(output);

					var editionCopy = $('<div />')
						.addClass('copy')
						.text(this.copy)
						.appendTo(output);
					
					break;
				}
		}
	}
});