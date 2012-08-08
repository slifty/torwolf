var EmailCommunication = Class.extend({
	ssl: false,
	pgp_public: [],
	pgp_private: [],
	messages: [],
	
	init: function() {
		var controlPane = $('<div />')
			.attr('id','email-control-pane')
			.addClass('control-pane')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var outputPane = $('<div />')
			.attr('id','email-output-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.outputPane = outputPane;
		
		var inputPane = $('<div />')
			.attr('id','email-input-pane')
			.addClass('input-pane')
			.appendTo(controlPane);
		this.inputPane = inputPane;
		
		var toolPane = $('<div />')
			.attr('id','email-tool-pane')
			.addClass('tool-pane')
			.appendTo(controlPane);
		this.toolPane = toolPane;
		
		var outputMessages = $('<ul />')
			.attr('id','email-output-messages')
			.addClass('output-messages')
			.appendTo(outputPane);
		this.outputMessages = outputMessages;
		
		var inputToLabel = $('<label />')
			.attr('id','email-input-to-label')
			.attr('for','email-input-to')
			.text('To:')
			.appendTo(inputPane);
		
		var inputTo = $('<input />')
			.attr('id','email-input-to')
			.attr('type','text')
			.appendTo(inputPane);
		this.inputTo = inputTo;
		
		
		var inputCCLabel = $('<label />')
			.attr('id','email-input-cc-label')
			.attr('for','email-input-cc')
			.text('CC:')
			.appendTo(inputPane);
		
		var inputCC = $('<input />')
			.attr('id','email-input-cc')
			.attr('type','text')
			.appendTo(inputPane);
		this.inputCC = inputCC;
		
		var inputBCCLabel = $('<label />')
			.attr('id','email-input-bcc-label')
			.attr('for','email-input-bcc')
			.text('BCC:')
			.appendTo(inputPane);
		
		var inputBCC = $('<input />')
			.attr('id','email-input-bcc')
			.attr('type','text')
			.appendTo(inputPane);
		this.inputBCC = inputBCC;
		
		var inputSubjectLabel = $('<label />')
			.attr('id','email-input-subject-label')
			.attr('for','email-input-subject')
			.text('Subject:')
			.appendTo(inputPane);
		
		var inputSubject = $('<input />')
			.attr('id','email-input-subject')
			.attr('type','text')
			.appendTo(inputPane);
		this.inputSubject = inputSubject;
		
		var inputBody = $('<textarea />')
			.attr('id','email-input-body')
			.appendTo(inputPane);
		this.inputBody = inputBody;
		
		var inputSubmit = $('<input />')
			.attr('id','email-input-submit')
			.attr('value','Send')
			.attr('type','submit')
			.appendTo(inputPane);
		this.inputSubmit = inputSubmit;
		
		var toolSSL = $('<div />')
			.attr('id','email-tool-ssl')
			.addClass('tool')
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				if(self.ssl)
					self.deactivateSSL();
				else
					self.activateSSL();
			})
			.appendTo(toolPane);
		this.toolSSL = toolSSL;
	},
	
	activateSSL: function() {
		console.log("TODO: Implement activate email SSL");
		this.ssl = true;
	},
	deactivateSSL: function() {
		console.log("TODO: Implement deactivate email SSL");
		this.ssl = false;
	},
	activatePGP: function() {
		
	},
	deactivatePGP: function() {
		
	},
	addPGPKey: function() {
		
	},
	
	sendPayload: function(text) {
		console.log("TODO: Send Email Message");
	},
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_EMAIL_PAYLOAD_EMAIL:
				this.emailOut(payload.data);
				break;
		}
	},
	
	emailOut: function(data) {
		var message = new EmailMessage();
		message.id = data.id;
		message.content = data.content;
		message.timestamp = window.GAME_COMMUNICATION.turn;
		message.secrets = data.secrets;
		message.subject = data.subject;
		message.from = data.from;
		message.to = data.to;
		message.cc = data.cc;
		message.bcc = data.bcc;
		message.pgp = data.pgp;
		this.messages.push(message);
		
		var output = $('<li />');
		output.attr('id','email-message-' + message.id);
		output.addClass('email-message');
		message.render(output);
		this.outputMessages.prepend(output);
	}
});

$(function() {
	window.EMAIL_COMMUNICATION = new EmailCommunication();
	
	var test = {
		target: COMMUNICATION_TARGET_EMAIL,
		payload: {
			type: COMMUNICATION_EMAIL_PAYLOAD_EMAIL,
			data: {
				id: 1,
				subject: "Test Subject",
				content: "test",
				secrets: {},
				from: {
					name: "Dan Schultz",
					address: "slifty@torwolf.com"
				},
				to: [{
					name: "Dan Schultz",
					address: "slifty@torwolf.com"
				}],
				cc: [{
					name: "Dan Schultz",
					address: "slifty@torwolf.com"
				}],
				bcc: [{
					name: "Dan Schultz",
					address: "slifty@torwolf.com"
				}],
				pgp: ""
			}
		}
	}
	//window.COMMUNICATION.receiveMessage(test);
});