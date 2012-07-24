var IRCUser = User.extend({
	alias: "",
	
	render: function(output) {
		output.empty();
		
		var outputName = $('<div />');
		outputName.addClass('name');
		outputName.addClass('user-' + this.id);
		outputName.text(this.alias);
		output.append(outputName);
	}
});