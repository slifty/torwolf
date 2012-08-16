var EmailMessage = Message.extend({
	
	init: function() {
		this._super();
		
		this.subject = "";
		this.to = [];
		this.cc = [];
		this.bcc = [];
		this.from = "";
		this.pgp = "";
		this.viewed = false;
	},
	
	render: function(output) {
		output.empty();
		
		var outputInfo = $('<div />');
		outputInfo.addClass('info');
		output.append(outputInfo);
		this.outputInfo = outputInfo;
		
		outputInfo.bind('click', {context: this}, function(ev) {
			var self = ev.data.context;
			self.viewed = true;
			
			self.outputContent.slideToggle(250);
		});
		
		var outputInfoFrom = $('<div />');
		outputInfoFrom.addClass('info-from');
		outputInfoFrom.text(this.from.name);
		outputInfo.append(outputInfoFrom);
		
		var outputInfoSubject = $('<div />');
		outputInfoSubject.addClass('info-subject');
		outputInfoSubject.text(this.subject);
		outputInfo.append(outputInfoSubject);
		
		var outputContent = $('<div />');
		outputContent.addClass('content');
		outputContent.hide();
		output.append(outputContent);
		this.outputContent = outputContent;
		
		var outputContentFrom = $('<div />');
		outputContentFrom.addClass('content-from');
		outputContentFrom.text("From:");
		outputContent.append(outputContentFrom);
		
		var outputContentFromName = $('<div />');
		outputContentFromName.addClass('name');
		outputContentFromName.text(this.from.name);
		outputContentFrom.append(outputContentFromName);
		
		var outputContentFromAddress = $('<div />');
		outputContentFromAddress.addClass('address');
		outputContentFromAddress.text(this.from.address);
		outputContentFrom.append(outputContentFromAddress);
		
		var outputContentTos = $('<ul />');
		outputContentTos.addClass('content-tos');
		outputContentTos.text("To:");
		outputContent.append(outputContentTos);
		
		for(var x in this.to) {
			var outputContentTo = $('<li />');
			outputContentTo.addClass('content-to');
			outputContentTos.append(outputContentTo);
			
			var outputContentToName = $('<div />');
			outputContentToName.addClass('name');
			outputContentToName.text(this.to[x].name);
			outputContentTo.append(outputContentToName);
		
			var outputContentToAddress = $('<div />');
			outputContentToAddress.addClass('address');
			outputContentToAddress.text(this.to[x].address);
			outputContentTo.append(outputContentToAddress);
		}
		
		var outputContentCCs = $('<ul />');
		outputContentCCs.addClass('content-ccs');
		outputContentCCs.text("CC:");
		outputContent.append(outputContentCCs);
		
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
	}
});