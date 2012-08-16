var Visible = Class.extend({
	init: function() {
		this.viewports = [];
	},
	
	render: function(viewport) {
		this.viewports.push(viewport);
		this.redraw();
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = viewports[x];
			var output = viewport.output;
			
			output.empty();
		}
	}
	
});