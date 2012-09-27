var Irc = Class.extend({
	
	init: function() {
		this.ssl = false;
		this.users = {};
		this.messages = [];
		
		var controlPane = $('<div />')
			.attr('id','irc-control-pane')
			.addClass('control-pane')
			.addClass('incommunicado')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var messageList = $('<ul />')
			.attr('id','irc-message-list')
			.addClass('output-messages')
			.appendTo(controlPane);
		this.messageList = messageList;
		
		var userList = $('<ul />')
			.attr('id','irc-user-list')
			.addClass('output-users')
			.appendTo(controlPane);
		this.userList = userList;
		
		var inputPane = $('<div />')
			.attr('id','irc-input-pane')
			.addClass('input-pane')
			.appendTo(controlPane);
		this.inputPane = inputPane;
		
		var inputTextField = $('<input />')
			.attr('id','irc-input-textfield')
			.attr('type','text')
			.bind('keydown',{context: this}, function(ev) {
			    if (ev.which == 13)
					inputSubmit.click();
			})
			.appendTo(inputPane);
		this.inputTextField = inputTextField;
		
		var inputSubmit = $('<div />')
			.attr('id', 'irc-input-submit')
			.addClass('button')
			.addClass('submit')
			.text(localization[LOCALE].gui.irc.SEND)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				var text = self.inputTextField.val();
				self.inputTextField.val('');
				self.messageIn(text);
			})
			.appendTo(inputPane);
		this.inputSubmit = inputSubmit;
		
		var toolPane = $('<div />')
			.attr('id','irc-tool-pane')
			.addClass('tool-pane')
			.appendTo(controlPane);
		this.toolPane = toolPane;
		
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_IRC, payload);
	},
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_IRC_PAYLOAD_CONNECT: 
				this.messageOut(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_ERROR:
				this.errorOut(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_MESSAGE:
				this.messageOut(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_JOIN:
				this.joinOut(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_LEAVE:
				this.leaveOut(payload.data);
				break;
			case COMMUNICATION_IRC_PAYLOAD_NICK: 
				this.switchNickOut(payload.data);
				break;
			default: 
				break; 
		}
	},
	
	errorOut: function(data) {
		var errorMessage = new IrcError();
		errorMessage.text = data.content.text;
		
		this.messages.push(errorMessage);
		
		var output = $('<li />')
			.appendTo(this.messageList);
			
		var viewport = new Viewport(output, VIEWPORT_IRC_MESSAGELIST);
		errorMessage.render(viewport);
		
		this.messageList.scrollTop(this.messageList.height());
	},
	
	messageIn: function(text) {
		var messageIn = new IrcMessageInPayload(text);
		this.sendPayload(messageIn.getPayload());
	},
	
	messageOut: function(data) {
		var message = new IrcMessage();
		message.text = data.text;
		message.id = data.messageId;
		message.sender = window.IRC.getUserById(data.userId);
		message.type = data.type;
		
		this.messages.push(message);
		
		var output = $('<li />')
			.appendTo(this.messageList);
		
		var viewport = new Viewport(output, VIEWPORT_IRC_MESSAGELIST);
		message.render(viewport);
		
		this.messageList.scrollTop(this.messageList.height());
	},
	
	/**
		Input: data - The data of the message sent over the socket
		
		Removes the current user list viewport, removes the old nick from the user list, 
		adds the new nick to the user list, and refreshes the viewport.
	*/
	
	switchNickOut: function(data) {
		var user = window.IRC.getUserById(data.userId);
		user.remove(); 
		
		$(".user" + user.nick).remove();
		
		user.nick = data.nick;
		
		var output = $('<li />')
			.appendTo(this.userList)
			.remove(".name");
	
		var viewport = new Viewport(output, VIEWPORT_IRC_USERLIST);
		user.render(viewport);
	},
	
	joinOut: function(data) {
		var user = new IrcUser();
		user.id = data.userId;
		user.nick = data.nick;
		user.player = window.STORYTELLER.getPlayerById(data.playerId);
		if(user.player == null) {
			console.log("Error in joinOut - user.player is null");
			return;
		}
		this.users[user.id] = user;
		
		var output = $('<li />')
			.appendTo(this.userList);
		
		var viewport = new Viewport(output, VIEWPORT_IRC_USERLIST);
		user.render(viewport);
	},
	
	leaveOut: function(data) {
		var user = this.getUserById(data.id);
		if(user == null) return;
		
		user.remove();
		delete this.users[user.id];
	},
	
	getUserById: function(id) {
		if(id in this.users)
			return this.users[id];
		return null;
	}
});

$(function() {
	window.IRC = new Irc();
});