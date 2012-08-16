var Secret = Class.extend({
	init: function() {
		this.content = "";
		this.turn_learned = 0;
		this.published = false;
		this.from = [];
		this.to = [];
	}
});