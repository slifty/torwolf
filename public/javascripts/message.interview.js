var InterviewMessage = Message.extend({
	init: function() {
		this._super();
		
		this.journalist = null;
		this.subject = null;
		this.quote = null;
		this.allegiance = null;
	}
});