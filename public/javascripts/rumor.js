var Rumor = Visible.extend({
	init: function() {
		this._super();
		
		this.id = "";
		this.truthStatus = "";
		this.publicationStatus = "";
		this.text = "";
		this.transfers = [];
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('rumor')
				.addClass('rumor-' + this.id)
				.addClass('truthStatus-' + this.truthStatus)
				.addClass('publicationStatus-' + this.publicationStatus);
				
			switch(viewport.type) {
				case VIEWPORT_RUMOR_STORYTELLER_RUMORPANE:
					var rumorText = $('<div />')
						.addClass('text')
						.text(this.text)
						.appendTo(output);
					
					var publicationStatus = $('<div />')
						.addClass('publicationStatus')
						.text(localization[LOCALE].gui.rumor.publicationStatus[this.publicationStatus])
						.appendTo(output);
						
					var publicationStatusCode = $('<div />')
						.addClass('publicationStatusCode')
						.text(localization[LOCALE].gui.rumor.publicationStatusCode[this.publicationStatus])
						.appendTo(output);
					
					var truthStatus = $('<div />')
						.addClass('truthStatus')
						.text(localization[LOCALE].gui.rumor.truthStatus[this.truthStatus])
						.appendTo(output);
						
					var truthStatusCode = $('<div />')
						.addClass('truthStatusCode')
						.text(localization[LOCALE].gui.rumor.truthStatusCode[this.truthStatus])
						.appendTo(output);
					break;
			}
		}
	},
});