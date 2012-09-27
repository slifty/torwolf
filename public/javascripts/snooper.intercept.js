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
					switch(this.payload.type) {
						case COMMUNICATION_EMAIL_PAYLOAD_REGISTER:
							description.text(sprintf(localization[LOCALE].messages.snooper.EMAIL_REGISTER, playerName, this.payload.data.address));
							break;
							
						case COMMUNICATION_EMAIL_PAYLOAD_SEND:
							description.text(sprintf(localization[LOCALE].messages.snooper.EMAIL_SEND, playerName));
							
							var message = new EmailMessage();
							message.bccAddresses = this.payload.data.bccAddresses;
							message.body = this.payload.data.body;
							message.ccAddresses = this.payload.data.ccAddresses;
							message.fromAddress = this.payload.data.fromAddress;
							message.id = this.payload.data.id;
							message.subject = this.payload.data.subject;
							message.timestamp = window.STORYTELLER.turn;
							message.toAddresses = this.payload.data.toAddresses;
							
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
							
							/* var message = new IrcMessage();
							message.text = this.payload.data.text;
							message.id = this.payload.data.messageId;
							message.sender = IRC.getUserById(this.payload.data.userId);
							message.type = this.payload.data.type;
							
							var viewport = new Viewport(details, VIEWPORT_SNOOPER_MESSAGELIST);
							message.render(viewport); */
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