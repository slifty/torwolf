var SnooperInteraction = Visible.extend({
	init: function() {
		this._super();
		
		this.id = "";
		this.message = null;
		this.player = null;
		this.responses = [];
	},
	
	redraw: function() {
		var playerName = (this.player && this.player.name)?this.player.name:localization[LOCALE].messages.snooper.ANONYMOUS;
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('target-' + this.target)
				.addClass('type-' + this.message.payload.type)
				.addClass('intercept');
			
			var description = $('<div />')
				.addClass('description')
				.appendTo(output);
			this.description = description;
			
			var details = $('<div />')
				.addClass('details')
				.appendTo(output);
			this.details = details;
			
			switch(viewport.type) {
				case VIEWPORT_SNOOPER_MESSAGELIST:
					switch(this.message.payload.type) {
						case COMMUNICATION_EMAIL_PAYLOAD_REGISTER:
							description.text(sprintf(localization[LOCALE].messages.snooper.EMAIL_REGISTER, playerName, this.message.payload.data.address));
							break;
							
						case COMMUNICATION_EMAIL_PAYLOAD_SEND:
							description.text(sprintf(localization[LOCALE].messages.snooper.EMAIL_SEND, playerName));
							
							var message = new EmailMessage();
							message.bccAddresses = this.message.payload.data.bccAddresses;
							message.body = this.message.payload.data.body;
							message.ccAddresses = this.message.payload.data.ccAddresses;
							message.fromAddress = this.message.payload.data.fromAddress;
							message.id = this.message.payload.data.id;
							message.subject = this.message.payload.data.subject;
							message.timestamp = window.STORYTELLER.turn;
							message.toAddresses = this.message.payload.data.toAddresses;
							
							var viewport = new Viewport(details, VIEWPORT_SNOOPER_MESSAGELIST);
							message.render(viewport);
							break;
						
						case COMMUNICATION_IRC_PAYLOAD_JOIN:
							description.text(sprintf(localization[LOCALE].messages.snooper.IRC_JOIN, playerName));
							break;
						
						case COMMUNICATION_IRC_PAYLOAD_LEAVE:
							description.text(sprintf(localization[LOCALE].messages.snooper.IRC_LEAVE, playerName));
							break;
						
						case COMMUNICATION_IRC_PAYLOAD_MESSAGE:
							description.text(sprintf(localization[LOCALE].messages.snooper.IRC_MESSAGE, playerName));
							
							var response = this.responses[0];
							
							var message = new IrcMessage();
							message.text = response.payload.data.text;
							message.id = response.payload.data.messageId;
							message.sender = IRC.getUserById(response.payload.data.userId);
							message.type = response.payload.data.type;
							
							var viewport = new Viewport(details, VIEWPORT_SNOOPER_MESSAGELIST);
							message.render(viewport);
							break;
						
						default:
							description.text(sprintf(localization[LOCALE].messages.snooper.DEFAULT, playerName, this.target))
							break;
					}
					
					var payload = $('<div />')
						.addClass('payload')
						.text(JSON.stringify(this.payload))
						.appendTo(output);
					this.payload = payload;
					
					break;
				}
		}
	}
});	