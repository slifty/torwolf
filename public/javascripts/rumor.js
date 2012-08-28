var Rumor = Visible.extend({
	init: function() {
		this._super();
		
		this.id = "";
		this.investigationStatus = "";
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
					
					if(this.publicationStatus == RUMOR_PUBLICATIONSTATUS_UNPUBLISHED && STORYTELLER.you.role == PLAYER_ROLE_JOURNALIST) {
						if(this.investigationStatus == RUMOR_INVESTIGATIONSTATUS_NONE) {
							var investigateButton = $('<div />')
								.addClass('investigateButton')
								.addClass('button')
								.text(localization[LOCALE].gui.rumor.INVESTIGATE)
								.bind('click',{context: this}, function(ev) {
									var self = ev.data.context;
									STORYTELLER.investigateIn(self.id);
								})
								.appendTo(output);
						}
						
						var investigationStatus = $('<div />')
							.addClass('investigationStatus')
							.text(localization[LOCALE].gui.rumor.investigationStatus[this.investigationStatus])
							.appendTo(output);
						var investigationStatusCode = $('<div />')
							.addClass('investigationStatusCode')
							.text(localization[LOCALE].gui.rumor.investigationStatusCode[this.investigationStatus])
							.appendTo(output);
					}
					
					break;
			}
		}
	},
});