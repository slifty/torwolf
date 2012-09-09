var Tor = Class.extend({
	
	init: function() {
		this.activated = false;
		this.users = {};
		this.messages = [];
		
		var controlPane = $('<div />')
			.attr('id','tor-control-pane')
			.addClass('control-pane')
			.addClass('incommunicado')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var messageList = $('<ul />')
			.attr('id','tor-message-list')
			.addClass('messages')
			.appendTo(controlPane);
		this.messageList = messageList;
		
		
		var inputPane = $('<div />')
			.attr('id','tor-input-pane')
			.addClass('input-pane')
			.appendTo(controlPane);
		this.inputPane = inputPane;
		
		var activateButton = $('<div />')
			.attr('id', 'tor-input-activate')
			.addClass('button')
			.text(localization[LOCALE].gui.tor.ACTIVATE)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				self.connectIn();
				activateButton.hide();
				deactivateButton.show();
			})
			.appendTo(inputPane);
		this.activateButton = activateButton;
		
		var deactivateButton = $('<div />')
			.attr('id', 'tor-input-deactivate')
			.addClass('button')
			.text(localization[LOCALE].gui.tor.DEACTIVATE)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				self.disconnectIn();
				deactivateButton.hide();
				activateButton.show();
			})
			.hide()
			.appendTo(inputPane);
		this.activateButton = activateButton;
		
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_TOR, payload);
	},
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_TOR_PAYLOAD_BRIDGE:
				this.bridgeOut(payload.data);
				break;
			case COMMUNICATION_TOR_PAYLOAD_CONNECT:
				this.connectOut(payload.data);
				break;
			case COMMUNICATION_TOR_PAYLOAD_DISCONNECT:
				this.disconnectOut(payload.data);
				break;
			case COMMUNICATION_TOR_PAYLOAD_ROUTE:
				this.routeOut(payload.data);
				break;
		}
	},
	
	bridgeOut: function(data) {
	},
	
	connectIn: function() {
		var connectIn = new TorConnectInPayload();
		this.sendPayload(connectIn.getPayload());
	},
	
	connectOut: function() {
		this.activated = true;
	},
	
	disconnectIn: function() {
		var disconnectIn = new TorDisconnectInPayload();
		this.sendPayload(disconnectIn.getPayload());
	},
	
	disconnectOut: function() {
		this.activated = false;
	},
	
	routeIn: function(target, payload) {
		if(!this.activated) {
			var error = new ErrorPayload(localization[LOCALE].errors.tor.DISABLED);
			return COMMUNICATION.routeMessage(target, error.getPayload());
		}
		
		var message = {
			target: target,
			payload: payload
		}
		
		var routeIn = new TorRouteInPayload(message);
		// Todo -- enable bridges here
		this.sendPayload(routeIn.getPayload());
	},
	
	routeOut: function(data) {
	}
	
});

$(function() {
	window.TOR = new Tor();
});