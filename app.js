
/**
 * Module dependencies.
 */

var config = require('./config'),
	express = require('express'),
	mongoose = require('mongoose'),
	page_routes = require('./routes/pages');

var app = module.exports = express.createServer(),
	io = require('socket.io').listen(app),
	game_routes = require('./game/communication');


// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Pages
app.get('/', page_routes.index);
app.get('/about', page_routes.about);
app.get('/play', page_routes.play);

app.listen(3000, function() {
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

// Shared Content
app.get("/constants.js", function(req, res) { res.sendfile('./constants.js'); });
app.get("/payloads.js", function(req, res) { res.sendfile('./payloads.js'); });


// Sockets
io.sockets.on('connection', function (socket) {
	socket.on('message', function (payload) {
		game_routes.receiveMessage(payload, socket);
	});
});