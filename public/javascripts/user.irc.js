var IRCUser = User.extend({
	init: function() {
		this._super();
		
		this.alias = "";
	},
	
	render: function(output) {
		output.empty();
		
		var outputName = $('<div />');
		outputName.addClass('name');
		outputName.addClass('user-' + this.id);
		outputName.text(this.alias);
		output.append(outputName);
	}
});