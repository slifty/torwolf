var Email = Class.extend({
	
	init: function() {
		this.accounts = [];
		this.messages = [];
		this.proxy = COMMUNICATION_PROXY_NONE;
		
		var controlPane = $('<div />')
			.attr('id','email-control-pane')
			.addClass('control-pane')
			.addClass('incommunicado')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var header = $('<div />')
			.addClass('header')
			.appendTo(controlPane);
		var logo = $('<div />')
			.addClass("logo")
			.appendTo(header);
		var title = $('<h1 />')
			.text(localization[LOCALE].gui.email.EMAIL)
			.appendTo(header)
		
		var tabs = $('<ul />')
			.attr('id','email-tabs')
			.addClass('tabs')
			.appendTo(controlPane);
		this.tabs = tabs;
		
		var tabAccounts = $('<li />')
			.attr('id', 'email-tab-accounts')
			.addClass('tab')
			.appendTo(tabs);
		var tabAccountsLink = $('<a />')
			.attr('href', '#email-account-pane')
			.text(localization[LOCALE].gui.email.tabs.ACCOUNT)
			.appendTo(tabAccounts);
			
		var tabInbox = $('<li />')
			.attr('id', 'email-tab-inbox')
			.addClass('tab')
			.appendTo(tabs);
		var tabInboxLink = $('<a />')
			.attr('href', '#email-message-list')
			.text(localization[LOCALE].gui.email.tabs.INBOX)
			.appendTo(tabInbox);
			
		var tabCompose = $('<li />')
			.attr('id', 'email-tab-compose')
			.addClass('tab')
			.appendTo(tabs);
		var tabAddressesLink = $('<a />')
			.attr('href', '#email-send-pane')
			.text(localization[LOCALE].gui.email.tabs.COMPOSE)
			.appendTo(tabCompose);
		
		var tabSettings = $('<li />')
			.attr('id', 'email-tab-settings')
			.addClass('tab')
			.appendTo(tabs);
		var tabSettingsLink = $('<a />')
			.attr('href', '#email-settings')
			.text(localization[LOCALE].gui.email.tabs.SETTINGS)
			.appendTo(tabAddresses);
		
		
		// Account creation
		var accountPane = $('<div />')
			.attr('id','email-account-pane')
			.appendTo(controlPane)
		this.accountPane = accountPane;
		
		var accountAddressLabel = $('<label />')
			.attr('id','email-account-address-label')
			.attr('for','email-account-address')
			.text(localization[LOCALE].gui.email.ADDRESS)
			.appendTo(accountPane);
		
		var accountAddress = $('<input />')
			.attr('id','email-account-address')
			.attr('type','text')
			.appendTo(accountPane);
		this.accountAddress = accountAddress;
		
		var accountSubmit = $('<div />')
			.attr('id','email-account-submit')
			.addClass('button')
			.addClass('submit')
			.text(localization[LOCALE].gui.email.CREATE)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				
				var account = new EmailAccount();
				account.address = self.accountAddress.val();
				
				self.registerIn(account);
			})
			.appendTo(accountPane);
		this.inputSubmit = accountSubmit;
		
		var accountList = $('<ul />')
			.attr('id','email-account-list')
			.appendTo(accountPane);
		this.accountList = accountList;
		
		
		// Inbox
		var messageList = $('<ul />')
			.attr('id','email-message-list')
			.appendTo(controlPane);
		this.messageList = messageList;
		
		
		// Composition
		var sendPane = $('<div />')
			.attr('id','email-send-pane')
			.addClass('input-pane')
			.appendTo(controlPane);
		this.sendPane = sendPane;
		
		var sendPaneForm = $('<form />')
			.attr('id','email-send-pane-form')
			.appendTo(sendPane);
		
		var sendPaneInputs = $('<ul />')
			.appendTo(sendPaneForm);
		
		var sendPaneInputItem_from = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputLabel_from = $('<label />')
			.attr('for', 'email-send-from')
			.text(localization[LOCALE].gui.email.FROM)
			.appendTo(sendPaneInputItem_from);
		var sendPaneInputField_from = $('<select />')
			.attr('id', 'email-send-from')
			.appendTo(sendPaneInputItem_from);
		this.inputFrom = sendPaneInputField_from;
		
		var sendPaneInputItem_to = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputLabel_to = $('<label />')
			.attr('for', 'email-send-to')
			.text(localization[LOCALE].gui.email.TO)
			.appendTo(sendPaneInputItem_to);
		var sendPaneInputField_to = $('<input />')
			.attr('id', 'email-send-to')
			.attr('type', 'text')
			.appendTo(sendPaneInputItem_to);
		this.inputTo = sendPaneInputField_to;
		
		var sendPaneInputItem_cc = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputLabel_cc = $('<label />')
			.attr('for', 'email-send-cc')
			.text(localization[LOCALE].gui.email.CC)
			.appendTo(sendPaneInputItem_cc);
		var sendPaneInputField_cc = $('<input />')
			.attr('id', 'email-send-cc')
			.attr('type', 'text')
			.appendTo(sendPaneInputItem_cc);
		this.inputCc = sendPaneInputField_cc;
		
		var sendPaneInputItem_bcc = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputLabel_bcc = $('<label />')
			.attr('for', 'email-send-bcc')
			.text(localization[LOCALE].gui.email.BCC)
			.appendTo(sendPaneInputItem_bcc);
		var sendPaneInputField_bcc = $('<input />')
			.attr('id', 'email-send-bcc')
			.attr('type', 'text')
			.appendTo(sendPaneInputItem_bcc);
		this.inputBcc = sendPaneInputField_bcc;
		
		var sendPaneInputItem_subject = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputLabel_subject = $('<label />')
			.attr('for', 'email-send-subject')
			.text(localization[LOCALE].gui.email.SUBJECT)
			.appendTo(sendPaneInputItem_subject);
		var sendPaneInputField_subject = $('<input />')
			.attr('id', 'email-send-subject')
			.attr('type', 'text')
			.appendTo(sendPaneInputItem_subject);
		this.inputSubject = sendPaneInputField_subject;
		
		var sendPaneInputItem_attachRumor = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputList_rumors = $('<ul />')
			.attr('id', 'email-send-rumors')
			.appendTo(sendPaneInputItem_attachRumor);
		this.rumors = sendPaneInputList_rumors;
		var sendPaneInputLink_attachRumor = $('<a />')
			.text(localization[LOCALE].gui.email.ATTACH_RUMOR)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				var rumors = STORYTELLER.rumors;
				
				var addRumorForm = $("<form />")
					.attr('id','email-send-addrumor-form');
				
				var addRumorInputs = $('<ul />')
					.appendTo(addRumorForm);
				var addRumorInputItem_rumor = $('<li />')
					.appendTo(addRumorInputs);
				var addRumorInputLabel_rumor = $('<label />')
					.attr('for', 'email-addrumor-rumor')
					.text(localization[LOCALE].gui.email.RUMOR)
					.appendTo(addRumorInputItem_rumor);
				var addRumorInputField_rumor = $('<select />')
					.attr('id', 'email-addrumor-rumor')
					.appendTo(addRumorInputItem_rumor);
				
				for(var x in rumors) {
					var rumorItem = $("<option />")
						.text(rumors[x].text)
						.attr('value', rumors[x].id)
						.appendTo(addRumorInputField_rumor);
				}
				
				addRumorForm.dialog({
					buttons: [
						{
							text: "Cancel",
							click: function() {
								$(this).dialog("close");
							}
						},
						{
							text: "Add",
							click: function() {
								var rumorId = addRumorInputField_rumor.val();
								var rumor = STORYTELLER.getRumorById(rumorId);
								var rumorItem = $('<li />')
									.appendTo(sendPaneInputList_rumors);
								var rumorItemText = $('<div />')
									.addClass('rumor')
									.text(rumor.text)
									.appendTo(rumorItem);
								var rumorHiddenField = $('<input />')
									.attr('type', 'hidden')
									.attr('class', 'rumorId')
									.val(rumorId)
									.appendTo(rumorItem);
								var rumorRemove = $('<div />')
									.addClass('button')
									.addClass('remove')
									.text(localization[LOCALE].gui.email.REMOVE)
									.bind('click',{context: this}, function(ev) {
										var self = ev.data.context;
										rumorItem.remove();
									})
									.appendTo(rumorItem);
								$(this).dialog("close");
							}
						}
					],
					draggable: false,
					modal: true,
					resizable: false,
					title: localization[LOCALE].gui.email.ATTACH_RUMOR
				});
			})
			.appendTo(sendPaneInputItem_attachRumor);
		this.attachRumor = sendPaneInputLink_attachRumor;
		
		var sendPaneInputItem_body = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputField_body = $('<textarea />')
			.attr('id', 'email-send-body')
			.appendTo(sendPaneInputItem_body);
		this.inputBody = sendPaneInputField_body;
		
		var sendPaneInputItem_submit = $('<li />')
			.appendTo(sendPaneInputs);
		var sendPaneInputItem_submit = $('<div />')
			.attr('id','email-send-submit')
			.addClass('button')
			.addClass('submit')
			.text(localization[LOCALE].gui.email.SEND)
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				
				var message = new EmailMessage();
				message.body = self.inputBody.val();
				message.fromAddress = self.inputFrom.val();
				message.subject = self.inputSubject.val();
				
				message.bccAddresses = $.map(self.inputBcc.val().split(","), $.trim).filter(function(a) { return (a == "")?0:1; });
				message.ccAddresses = $.map(self.inputCc.val().split(","), $.trim).filter(function(a) { return (a == "")?0:1; });
				message.toAddresses = $.map(self.inputTo.val().split(","), $.trim).filter(function(a) { return (a == "")?0:1; });
				
				message.rumorIds = [];
				$("#email-send-rumors input.rumorId").each(function(index, rumorInput) {
					var rumorInput = $(rumorInput);
					if(message.rumorIds.indexOf(rumorInput.val) === -1)
						message.rumorIds.push(rumorInput.val());
				})
				
				// TODO -- remove empty addresses from all three arrays
				
				self.sendIn(message);
			})
			.appendTo(sendPaneInputItem_submit);
		this.inputSubmit = sendPaneInputItem_submit;
		
		
		// Settings
		var settingsPane = $('<div />')
			.attr('id','email-settings')
			.appendTo(controlPane);
		this.settingsPane = settingsPane;
		
		var proxySettingsForm = $('<form />')
			.attr('id','email-settings-proxy-form')
			.appendTo(settingsPane);
		
		var proxySettingsInputs = $('<ul />')
			.appendTo(proxySettingsForm);
		
		var proxySettingsItem_tor = $('<li />')
			.appendTo(proxySettingsInputs);
		var proxySettingsInputLabel_tor = $('<label />')
			.attr('for', 'email-settings-tor')
			.addClass('checkbox')
			.text(localization[LOCALE].gui.email.TOR)
			.appendTo(proxySettingsItem_tor);
		var proxySettingsField_tor = $('<input />')
			.attr('id', 'email-settings-tor')
			.attr('type', 'checkbox')
			.bind('click',{context: this}, function(ev) {
				var self = ev.data.context;
				self.proxy = proxySettingsField_tor.is(":checked")?COMMUNICATION_PROXY_TOR:COMMUNICATION_PROXY_NONE;
			})
			.appendTo(proxySettingsItem_tor);
		this.inputTor = proxySettingsField_tor;
		
		
		// Set things up
		controlPane.tabs();
		
	},
	
	sendPayload: function(payload) {
		if(this.proxy == COMMUNICATION_PROXY_TOR) {
			TOR.routeIn(COMMUNICATION_TARGET_EMAIL, payload);
		} else {
			COMMUNICATION.sendMessage(COMMUNICATION_TARGET_EMAIL, payload);
		}
	},
	receivePayload: function(payload) {
		switch(payload.type) {
			case COMMUNICATION_EMAIL_PAYLOAD_REGISTER:
				this.registerOut(payload.data);
				break;
			case COMMUNICATION_EMAIL_PAYLOAD_SEND:
				this.sendOut(payload.data);
				break;
		}
	},
	
	registerIn: function(account) {
		var registerIn = new EmailRegisterInPayload(account);
		this.sendPayload(registerIn.getPayload());
	},
	registerOut: function(data) {
		var account = new EmailAccount();
		account.address = data.address;
		account.player = STORYTELLER.getPlayerById(data.playerId);
		
		if(account.player !== null && account.player.id == COMMUNICATION.playerId) {
			this.accounts.push(account);
			var output = $('<option />')
				.appendTo(this.inputFrom)
			
			var viewport = new Viewport(output, VIEWPORT_EMAIL_FROM);
			account.render(viewport);
			
			var output = $('<li />')
				.appendTo(this.accountList)
			var viewport = new Viewport(output, VIEWPORT_EMAIL_ACCOUNTLIST);
			account.render(viewport);
			
		}
	},
	sendIn: function(message) {
		var sendIn = new EmailSendInPayload(message);
		this.sendPayload(sendIn.getPayload());
	},
	sendOut: function(data) {
		var message = new EmailMessage();
		message.bccAddresses = data.bccAddresses;
		message.body = data.body;
		message.ccAddresses = data.ccAddresses;
		message.fromAddress = data.fromAddress;
		message.id = data.id;
		message.subject = data.subject;
		message.timestamp = window.STORYTELLER.turn;
		message.toAddresses = data.toAddresses;
		this.messages.push(message);
		
		var output = $('<li />')
			.prependTo(this.messageList);
		
		var viewport = new Viewport(output, VIEWPORT_EMAIL_MESSAGELIST);
		message.render(viewport);
	}
});

$(function() {
	window.EMAIL = new Email();
});