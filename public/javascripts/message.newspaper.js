var NewspaperMessage = Message.extend({
	init: function() {
		this._super();
		
		this.headline = "";
		this.messages = [];
	}
});