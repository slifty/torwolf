var IRCCommunication = Communication.extend({
	ssl: false,
	users: [],
	
	init: function() {
		var controlPane = $('<div />');
		controlPane.attr('id','irc-control-pane');
		controlPane.addClass('control-pane');
		this.controlPane = controlPane;
		$("body").append(controlPane);
		
		var outputPane = $('<div />');
		outputPane.attr('id','irc-output-pane');
		outputPane.addClass('output-pane');
		this.outputPane = outputPane;
		controlPane.append(outputPane);
		
		var inputPane = $('<div />');
		inputPane.attr('id','irc-input-pane');
		inputPane.addClass('input-pane');
		this.inputPane = inputPane;
		controlPane.append(inputPane);
		
		var toolPane = $('<div />');
		toolPane.attr('id','irc-tool-pane');
		toolPane.addClass('tool-pane');
		this.toolPane = toolPane;
		controlPane.append(toolPane);
		
		var outputMessages = $('<ul />');
		outputMessages.attr('id','irc-output-messages');
		outputMessages.addClass('output-messages');
		this.outputMessages = outputMessages;
		outputPane.append(outputMessages);
		
		var outputUsers = $('<ul />');
		outputUsers.attr('id','irc-output-users');
		outputUsers.addClass('output-users');
		this.outputUsers = outputUsers;
		outputPane.append(outputUsers);
		
		var inputTextField = $('<input />');
		inputTextField.attr('id','irc-input-textfield');
		inputTextField.attr('type','text');
		this.inputTextField = inputTextField;
		inputPane.append(inputTextField);
		
		var inputSubmit = $('<input />');
		inputSubmit.attr('id','irc-input-submit');
		inputSubmit.attr('value','Send');
		inputSubmit.attr('type','submit');
		this.inputSubmit = inputSubmit;
		inputPane.append(inputSubmit);
		
		var toolSSL = $('<div />');
		toolSSL.attr('id','irc-tool-ssl');
		toolSSL.addClass('tool');
		toolSSL.click(function() {
			if(window.IRC_COMMUNICATION.ssl)
				window.IRC_COMMUNICATION.deactivateSSL();
			else
				window.IRC_COMMUNICATION.activateSSL();
		});
		this.toolSSL = toolSSL;
		toolPane.append(toolSSL);
	},
	
	activateSSL: function() {
		console.log("TODO: Implement activate IRC SSL");
		this.ssl = true;
	},
	deactivateSSL: function() {
		console.log("TODO: Implement deactivate IRC SSL");
		this.ssl = false;
	},
	
	sendPayload: function(text) {
		console.log("TODO: Send IRC Message");
	},
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_IRC_PAYLOAD_BROADCAST:
				this.newBroadcast(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_JOIN:
				this.newJoin(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_LEAVE:
				this.newLeave(payload.data);
				break;
		}
	},
	
	newBroadcast: function(data) {
		var message = new IRCMessage();
		message.id = data.id;
		message.content = data.content;
		message.timestamp = window.GAME_COMMUNICATION.turn;
		message.secrets = data.secrets;
		message.sender = window.IRC_COMMUNICATION.getUserById(data.user);
		if(message.sender == null) return;
		this.messages.push(message);
		
		var output = $('<li />');
		output.attr('id','irc-message-' + message.id);
		output.addClass('irc-message');
		message.render(output);
		this.outputMessages.append(output);
	},
	newJoin: function(data) {
		var user = new IRCUser();
		user.id = data.id;
		user.alias = data.alias;
		user.player = window.GAME_COMMUNICATION.getPlayerById(data.player);
		if(user.player == null) return;
		this.users.push(user);
		
		var output = $('<li />');
		output.attr('id', 'irc-user-' + user.id);
		output.addClass('irc-user');
		user.render(output);
		this.outputUsers.append(output);
		
		var message = new IRCActionMessage();
		message.id = 0;
		message.type = MESSAGE_IRC_SYSTEM_TYPE_JOIN;
		message.target = user;
		
		var output = $('<li />');
		output.attr('id','message-' + message.id);
		output.addClass('message');
		message.render(output);
		this.outputMessages.append(output);
		this.messages.push(message);
	},
	newLeave: function(data) {
		var user = this.getUserById(data.id);
		if(user == null) return;

		this.users.splice(this.users.indexOf(user),1);
		$("#irc-user-" + user.id).remove();
		
		var message = new IRCActionMessage();
		message.id = 0;
		message.type = MESSAGE_IRC_SYSTEM_TYPE_LEAVE;
		message.target = user;
		
		var output = $('<li />');
		output.attr('id','message-' + message.id);
		output.addClass('message');
		message.render(output);
		this.outputMessages.append(output);
		this.messages.push(message);
	},
	
	getUserById: function(id) {
		for(var x in this.users) {
			if(this.users[x].id == id)
				return this.users[x];
		}
		return null;
	}
});

$(function() {
	window.IRC_COMMUNICATION = new IRCCommunication();
	
	// TEST
	var test = {
		target: COMMUNICATION_TARGET_IRC,
		payload: {
			type: COMMUNICATION_IRC_PAYLOAD_JOIN,
			data: {
				id: 1,
				player: 1,
				alias: "slifty"
			}
		}
	}
	window.COMMUNICATION.receivePayload(test);
	
	var test = {
		target: COMMUNICATION_TARGET_IRC,
		payload: {
			type: COMMUNICATION_IRC_PAYLOAD_BROADCAST,
			data: {
				id: 1,
				content: "test",
				user: 1,
			}
		}
	}
	window.COMMUNICATION.receivePayload(test);
	
	var test = {
		target: COMMUNICATION_TARGET_IRC,
		payload: {
			type: COMMUNICATION_IRC_PAYLOAD_LEAVE,
			data: {
				id: 1,
				player: 1,
				alias: "slifty"
			}
		}
	}
	window.COMMUNICATION.receivePayload(test);
});