var Game = Visible.extend({
	
	init: function() {
		this._super();
		
		this.id = "";
		this.name = "";
		this.isPrivate = null;
		this.password = "";
		this.players = {};
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('game');
			
			switch(viewport.type) {
				case VIEWPORT_GAME_LOBBY_GAMELIST:
					var outputName = $('<div />')
						.addClass('name')
						.text(this.name)
						.appendTo(output);
		
					if(this.isPrivate) {
						var outputPrivate = $('<div />')
							.addClass('game-badge')
							.addClass('private')
							.text(localization[LOCALE].gui.lobby.badges.PRIVATE)
							.appendTo(output);
					}
					break;
				}
		}
	}
});