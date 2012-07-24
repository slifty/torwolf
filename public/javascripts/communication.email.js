var EmailCommunication = Communication.extend({
	ssl: false,
	pgp_public: [],
	pgp_private: [],
	
	init: function() {
		var controlPane = $('<div />');
		controlPane.attr('id','email-control-pane');
		controlPane.addClass('control-pane');
		this.controlPane = controlPane;
		$("body").append(controlPane);
		
		var outputPane = $('<div />');
		outputPane.attr('id','email-output-pane');
		outputPane.addClass('output-pane');
		this.outputPane = outputPane;
		controlPane.append(outputPane);
		
		var inputPane = $('<div />');
		inputPane.attr('id','email-input-pane');
		inputPane.addClass('input-pane');
		this.inputPane = inputPane;
		controlPane.append(inputPane);
		
		var toolPane = $('<div />');
		toolPane.attr('id','email-tool-pane');
		toolPane.addClass('tool-pane');
		this.toolPane = toolPane;
		controlPane.append(toolPane);
		
		var outputMessages = $('<ul />');
		outputMessages.attr('id','email-output-messages');
		outputMessages.addClass('output-messages');
		this.outputMessages = outputMessages;
		outputPane.append(outputMessages);
		
		var inputToLabel = $('<label />');
		inputToLabel.attr('id','email-input-to-label');
		inputToLabel.attr('for','email-input-to');
		inputToLabel.text('To:');
		inputPane.append(inputToLabel);
		
		var inputTo = $('<input />');
		inputTo.attr('id','email-input-to');
		inputTo.attr('type','text');
		this.inputTo = inputTo;
		inputPane.append(inputTo);
		
		
		var inputCCLabel = $('<label />');
		inputCCLabel.attr('id','email-input-cc-label');
		inputCCLabel.attr('for','email-input-cc');
		inputCCLabel.text('CC:');
		inputPane.append(inputCCLabel);
		
		var inputCC = $('<input />');
		inputCC.attr('id','email-input-cc');
		inputCC.attr('type','text');
		this.inputCC = inputCC;
		inputPane.append(inputCC);
		
		var inputBCCLabel = $('<label />');
		inputBCCLabel.attr('id','email-input-bcc-label');
		inputBCCLabel.attr('for','email-input-bcc');
		inputBCCLabel.text('BCC:');
		inputPane.append(inputBCCLabel);
		
		var inputBCC = $('<input />');
		inputBCC.attr('id','email-input-bcc');
		inputBCC.attr('type','text');
		this.inputBCC = inputBCC;
		inputPane.append(inputBCC);
		
		var inputSubjectLabel = $('<label />');
		inputSubjectLabel.attr('id','email-input-subject-label');
		inputSubjectLabel.attr('for','email-input-subject');
		inputSubjectLabel.text('Subject:');
		inputPane.append(inputSubjectLabel);
		
		var inputSubject = $('<input />');
		inputSubject.attr('id','email-input-subject');
		inputSubject.attr('type','text');
		this.inputSubject = inputSubject;
		inputPane.append(inputSubject);
		
		var inputBody = $('<textarea />');
		inputBody.attr('id','email-input-body');
		this.inputBody = inputBody;
		inputPane.append(inputBody);
		
		var inputSubmit = $('<input />');
		inputSubmit.attr('id','email-input-submit');
		inputSubmit.attr('value','Send');
		inputSubmit.attr('type','submit');
		this.inputSubmit = inputSubmit;
		inputPane.append(inputSubmit);
		
		var toolSSL = $('<div />');
		toolSSL.attr('id','email-tool-ssl');
		toolSSL.addClass('tool');
		toolSSL.click(function() {
			if(window.EMAIL_COMMUNICATION.ssl)
				window.EMAIL_COMMUNICATION.deactivateSSL();
			else
				window.EMAIL_COMMUNICATION.activateSSL();
		});
		this.toolSSL = toolSSL;
		toolPane.append(toolSSL);
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
				this.newEmail(payload.data);
				break;
		}
	},
	
	newEmail: function(data) {
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
	window.COMMUNICATION.receivePayload(test);
});