var Player = Visible.extend({
	init: function() {
		this._super();
		
		this.status = "";
		this.allegiance = "";
		this.id = "";
		this.name = "";
		this.role = "";
		this.rumors = [];
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('player')
				.addClass('player-' + this.id)
				.addClass('allegiance-' + this.role)
				.addClass('role-' + this.role)
				.addClass('status-' + this.status)
				
			if(this.id == COMMUNICATION.playerId)
				output.addClass('you');
			
			switch(viewport.type) {
				case VIEWPORT_STORYTELLER_PEERPANE:
					var playerName = $('<div />')
						.addClass('name')
						.text(this.name + ((this.id == COMMUNICATION.playerId)?" (" + localization[LOCALE].gui.player.YOU + ")":""))
						.appendTo(output);
					
					var playerRole = $('<div />')
						.addClass('role')
						.text(localization[LOCALE].gui.player.role[this.role])
						.appendTo(output);
						
					var playerRoleCode = $('<div />')
						.addClass('roleCode')
						.text(localization[LOCALE].gui.player.roleCode[this.role])
						.appendTo(output);
					
					var playerAllegiance = $('<div />')
						.addClass('allegiance')
						.text(localization[LOCALE].gui.player.allegiance[this.allegiance])
						.appendTo(output);
						
					var playerAllegianceCode = $('<div />')
						.addClass('allegianceCode')
						.text(localization[LOCALE].gui.player.allegianceCode[this.allegiance])
						.appendTo(output);
						
					var playerId = $('<div />')
						.addClass('id')
						.text(this.id)
						.appendTo(output);
						
					if(STORYTELLER.you.role == PLAYER_ROLE_SPY) {
						var killButton = $('<div />')
							.addClass('killButton')
							.addClass('button')
							.text(localization[LOCALE].gui.player.KILL)
							.bind('click',{context: this}, function(ev) {
								var self = ev.data.context;
								STORYTELLER.killIn(self.id);
							})
							.appendTo(output);
					}
					break;

					
				case VIEWPORT_STORYTELLER_PLAYERPANE:
					var playerAvatar = $('<div />')
						.addClass('avatar')
						.addClass('player-' + this.id)
						.appendTo(output);
					
					var playerAvatarImg = $('<img />')
						.appendTo(playerAvatar);
					
					var playerName = $('<div />')
						.addClass('name')
						.text((this.id == COMMUNICATION.playerId)?localization[LOCALE].gui.player.YOU:this.name)
						.appendTo(output);
					
					var playerStatus = $('<div />')
						.addClass('status')
						.text(localization[LOCALE].gui.player.status[this.status])
						.appendTo(output);
					
					var playerRole = $('<div />')
						.addClass('role')
						.text(localization[LOCALE].gui.player.role[this.role])
						.appendTo(output);
					
					var playerAllegiance = $('<div />')
						.addClass('allegiance')
						.text(localization[LOCALE].gui.player.allegiance[this.allegiance])
						.appendTo(output);
						
					break;
			}
		}
	},
});