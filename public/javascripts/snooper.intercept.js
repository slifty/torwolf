var SnooperIntercept = Visible.extend({
	init: function() {
		this._super();
		
		this.player = null;
		this.target = "";
		this.payload = "";
	},
	
	redraw: function() {
		var playerName = (this.player && this.player.name)?this.player.name:localization[LOCALE].messages.snooper.ANONYMOUS;
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('target-' + this.target)
				.addClass('type-' + this.payload.type)
				.addClass('intercept');
			
			switch(viewport.type) {
				case VIEWPORT_SNOOPER_INTERCEPT_MESSAGELIST:
					switch(this.payload.type) {
						case COMMUNICATION_EMAIL_PAYLOAD_REGISTER:
							var description = $('<div />')
								.addClass('description')
								.text(sprintf(localization[LOCALE].messages.snooper.DEFAULT, playerName, this.target, this.payload))
								.appendTo(output);
							this.description = description;
							break;
						default:
							var description = $('<div />')
								.addClass('description')
								.text(sprintf(localization[LOCALE].messages.snooper.DEFAULT, playerName, this.target, this.payload))
								.appendTo(output);
							this.description = description;
							break;
					}
					break;
				}
		}
	}
});	