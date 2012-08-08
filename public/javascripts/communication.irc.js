var IRCCommunication = Class.extend({
	ssl: false,
	users: {},
	messages: [],
	
	init: function() {
		var controlPane = $('<div />')
			.attr('id','irc-control-pane')
			.addClass('control-pane')
			.addClass('game-page')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var outputPane = $('<div />')
			.attr('id','irc-output-pane')
			.addClass('output-pane')
			.appendTo(controlPane);
		this.outputPane = outputPane;
		
		var inputPane = $('<div />')
			.attr('id','irc-input-pane')
			.addClass('input-pane')
			.appendTo(controlPane);
		this.inputPane = inputPane;
		
		var toolPane = $('<div />')
			.attr('id','irc-tool-pane')
			.addClass('tool-pane')
			.appendTo(controlPane);
		this.toolPane = toolPane;
		
		var outputMessages = $('<ul />')
			.attr('id','irc-output-messages')
			.addClass('output-messages')
			.appendTo(outputPane);
		this.outputMessages = outputMessages;
		
		var outputUsers = $('<ul />')
			.attr('id','irc-output-users')
			.addClass('output-users')
			.appendTo(outputPane);
		this.outputUsers = outputUsers;
		
		var inputTextField = $('<input />')
			.attr('id','irc-input-textfield')
			.attr('type','text')
			.appendTo(inputPane);
		this.inputTextField = inputTextField;
		
		var inputSubmit = $('<input />')
			.attr('id','irc-input-submit')
			.attr('value','Send')
			.attr('type','submit')
			.appendTo(inputPane);
		this.inputSubmit = inputSubmit;
		
		var toolSSL = $('<div />')
			.attr('id','irc-tool-ssl')
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
				this.broadcastOut(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_JOIN:
				this.joinOut(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_LEAVE:
				this.leaveOut(payload.data);
				break;
		}
	},
	
	broadcastOut: function(data) {
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
	joinOut: function(data) {
		var user = new IRCUser();
		user.id = data.id;
		user.alias = data.alias;
		user.player = window.GAME_COMMUNICATION.getPlayerById(data.player);
		if(user.player == null) return;
		this.users[user.id] = user;
		
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
	leaveOut: function(data) {
		var user = this.getUserById(data.id);
		if(user == null) return;
		
		delete this.users[user.id];
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
		if(id in this.users)
			return this.users[id];
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
	//window.COMMUNICATION.receiveMessage(test);
	
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
	//window.COMMUNICATION.receiveMessage(test);
	
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
	//window.COMMUNICATION.receiveMessage(test);
});