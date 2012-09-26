var EmailMessage = Visible.extend({
	init: function() {
		this._super();
		
		this.bccAddresses = [];
		this.body = "";
		this.ccAddresses = [];
		this.fromAddress = "";
		this.id = "";
		this.rumorIds = [];
		this.subject = "";
		this.toAddresses = [];
		this.viewed = false;
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('message');
			
			switch(viewport.type) {
				case VIEWPORT_EMAIL_MESSAGELIST:
					var shortMessage = $('<div />')
						.addClass('short')
						.bind('click', {context: this}, function(ev) {
							var self = ev.data.context;
							self.viewed = true;
							self.longMessage.slideToggle(250);
						})
						.appendTo(output);
					this.shortMessage = shortMessage;
					
					var fromAddress = $('<div />')
						.addClass('from')
						.text(this.fromAddress)
						.appendTo(shortMessage);
		
					var messageSubject = $('<div />')
						.addClass('subject')
						.text(this.subject)
						.appendTo(shortMessage);
		
					var longMessage = $('<div />')
						.addClass('long')
						.hide()
						.appendTo(output);
					this.longMessage = longMessage;
					
					var fromLabel = $('<div />')
						.addClass('label')
						.text(localization[LOCALE].gui.email.FROM)
						.appendTo(longMessage);
					fromAddress.clone()
						.appendTo(longMessage);

					if(this.toAddresses.length > 0) {
						var toLabel = $('<div />')
							.addClass('label')
							.text(localization[LOCALE].gui.email.TO)
							.appendTo(longMessage);
						var toList = $('<ul />')
							.addClass('to-list')
							.appendTo(longMessage);
						for(var x in this.toAddresses) {
							var to = $('<li />')
								.addClass('to')
								.text(this.toAddresses[x])
								.appendTo(toList);
						}
					}
					
					if(this.ccAddresses.length > 0) {
						var ccLabel = $('<div />')
							.addClass('label')
							.text(localization[LOCALE].gui.email.CC)
							.appendTo(longMessage);
						var ccList = $('<ul />')
							.addClass('cc-list')
							.appendTo(longMessage);
						for(var x in this.ccAddresses) {
							var to = $('<li />')
								.addClass('cc')
								.text(this.ccAddresses[x])
								.appendTo(ccList);
						}
					}
		
					var messageBody = $('<div />')
						.addClass('body')
						.text(this.body)
						.appendTo(longMessage);
					
					break;
			}
		}
	}
});