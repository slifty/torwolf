var EmailAccount = Visible.extend({
	init: function() {
		this._super();
		
		this.address = "";
		this.id = "";
		this.player = null;
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('account');
			
			switch(viewport.type) {
				case VIEWPORT_EMAIL_ACCOUNTLIST:
					var userName = $('<div />')
						.addClass('name')
						.text(this.address)
						.appendTo(output);
					
					break;
					
				case VIEWPORT_EMAIL_ADDRESSLIST:
					var userName = $('<div />')
						.addClass('name')
						.text(this.address)
						.appendTo(output);
					
					break;
				
				case VIEWPORT_EMAIL_FROM:
					output.attr('value',this.address);
					output.text(this.address);
					break;
			}
		}
	}
});