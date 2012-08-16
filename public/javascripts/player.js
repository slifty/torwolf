var Player = Visible.extend({
	init: function() {
		this._super();
		
		this.alive = true;
		this.allegiance = "";
		this.id = "";
		this.name = "";
		this.role = "";
		this.secrets = [];
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty();
			switch(viewport.type) {
				case VIEWPORT_PLAYER_STORYTELLER:
					var outputName = $('<div />')
						.addClass('name')
						.addClass('player-' + this.id)
						.text(this.name)
						.appendTo(output);
		
					var outputId = $('<div />')
						.addClass('id')
						.addClass('player-' + this.id)
						.text(this.id)
						.appendTo(output);
					break;
				
				case VIEWPORT_PLAYER_LOBBY:
					break
			}
		}
	}
});