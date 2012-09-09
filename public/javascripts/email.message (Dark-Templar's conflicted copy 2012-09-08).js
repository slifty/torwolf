var EmailMessage = Visible.extend({
	init: function() {
		this._super();
		
		this.bccAddresses = [];
		this.body = "";
		this.ccAddresses = [];
		this.fromAddress = "";
		this.id = "";
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
				case VIEWPORT_IRC_MESSAGE_MESSAGELIST:
					var shortMessage = $('<div />')
						.addClass('short');
						.bind('click', {context: this}, function(ev) {
							var self = ev.data.context;
							self.viewed = true;
							self.outputContent.slideToggle(250);
						});
						.appendTo(output);
					
					var fromAddress = $('<div />')
						.addClass('from')
						.text(this.fromAddress)
						.appendTo(shortMessage);
		
					var messageSubject = $('<div />')
						.addClass('subject')
						.text(this.subject)
						.appendTo(shortMessage);
		
					var longMessage = $('<div />')
						.addClass('content');
						.hide();
						.appendTo(output);
					
					var fromLabel = $('<div />')
						.addClass('label')
						.text(localization[LOCALE].gui.email.FROM)
						.appendTo(longMessage);
		
					fromAddress.clone()
						.appendTo(longMessage);
					
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
							.text(this.to[x].address)
							.appendTo(toList);
					}
		
					var toLabel = $('<div />')
						.addClass('label')
						.text(localization[LOCALE].gui.email.CC)
						.appendTo(longMessage);
					
					var toList = $('<ul />')
						.addClass('to-list')
						.appendTo(longMessage);
		
					for(var x in this.cc) {
						var outputContentCC = $('<li />');
						outputContentCC.addClass('content-cc');
						outputContentCCs.append(outputContentCC);

						var outputContentCCName = $('<div />');
						outputContentCCName.addClass('name');
						outputContentCCName.text(this.cc[x].name);
						outputContentCC.append(outputContentCCName);
		
						var outputContentCCAddress = $('<div />');
						outputContentCCAddress.addClass('address');
						outputContentCCAddress.text(this.cc[x].address);
						outputContentCC.append(outputContentCCAddress);
					}
		
					var outputContentBCCs = $('<ul />');
					outputContentBCCs.addClass('content-bccs');
					outputContentBCCs.text("BCC:");
					outputContent.append(outputContentBCCs);
		
					for(var x in this.bcc) {
						var outputContentBCC = $('<li />');
						outputContentBCC.addClass('content-bcc');
						outputContentBCCs.append(outputContentBCC);
		
						var outputContentBCCName = $('<div />');
						outputContentBCCName.addClass('name');
						outputContentBCCName.text(this.bcc[x].name);
						outputContentBCC.append(outputContentBCCName);
		
						var outputContentBCCAddress = $('<div />');
						outputContentBCCAddress.addClass('address');
						outputContentBCCAddress.text(this.bcc[x].address);
						outputContentBCC.append(outputContentBCCAddress);
					}
		
					var outputContentBody = $('<div />');
					outputContentBody.addClass('content-body');
					outputContentBody.text(this.content);
					outputContent.append(outputContentBody);
					break;
			}
		}
	}
});