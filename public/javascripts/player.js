var Player = Visible.extend({
	init: function() {
		this._super();
		
		this.status = PLAYER_STATUS_ALIVE;
		this.allegiance = PLAYER_ALLEGIANCE_UNKNOWN;
		this.id = "";
		this.name = "";
		this.role = PLAYER_ROLE_UNKNOWN;
		this.secrets = [];
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty();
			switch(viewport.type) {
				case VIEWPORT_PLAYER_STORYTELLER_PEERPANE:
					var playerName = $('<div />')
						.addClass('name')
						.addClass('player-' + this.id)
						.addClass('status-' + this.status)
						.text(this.name + (this.id == COMMUNICATION.playerId)?"(" + localization[LOCALE].gui.player.YOU + ")":"")
						.appendTo(output);
					
					var playerId = $('<div />')
						.addClass('id')
						.addClass('player-' + this.id)
						.text(this.id)
						.appendTo(output);
					
					var playerRole = $('<div />')
						.addClass('role')
						.addClass('role-' + this.role)
						.addClass('player-' + this.id)
						.appendTo(output);
					var playerRoleText = $('<div />')
						.text(localization[LOCALE].gui.player.roleCode[this.role])
						.appendTo(playerRole);
						
					var playerRoleDetail = $('<div />')
						.addClass('detail')
						.text(localization[LOCALE].gui.player.role[this.role])
						.appendTo(playerRole);
					
					var playerAllegiance = $('<div />')
						.addClass('allegiance')
						.addClass('allegiance-' + this.role)
						.addClass('player-' + this.id)
						.appendTo(output);
					var playerAllegianceText = $('<div />')
						.text(localization[LOCALE].gui.player.allegianceCode[this.allegiance])
						.appendTo(playerAllegiance);
						
					var playerAllegianceDetail = $('<div />')
						.addClass('detail')
						.text(localization[LOCALE].gui.player.allegiance[this.allegiance])
						.appendTo(playerAllegiance);
					break;
					
				case VIEWPORT_PLAYER_STORYTELLER_PLAYERPANE:
					var playerAvatar = $('<div />')
						.addClass('avatar')
						.addClass('player-' + this.id)
						.appendTo(output);
					
					var playerAvatarImg = $('<img />')
						.appendTo(playerAvatar);
					
					var playerName = $('<div />')
						.addClass('name')
						.addClass('player-' + this.id)
						.text((this.id == COMMUNICATION.playerId)?localization[LOCALE].gui.player.YOU:this.name)
						.appendTo(output);
					
					var playerStatus = $('<div />')
						.addClass('status')
						.addClass('status-' + this.status)
						.addClass('player-' + this.id)
						.text(localization[LOCALE].gui.player.status[this.status])
						.appendTo(output);
					
					var playerRole = $('<div />')
						.addClass('role')
						.addClass('role-' + this.role)
						.addClass('player-' + this.id)
						.text(localization[LOCALE].gui.player.role[this.role])
						.appendTo(output);
					
					var playerAllegiance = $('<div />')
						.addClass('allegiance')
						.addClass('allegiance-' + this.role)
						.addClass('player-' + this.id)
						.text(localization[LOCALE].gui.player.allegiance[this.allegiance])
						.appendTo(output);
						
					break;
			}
		}
	},
});