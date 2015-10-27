var sequelize = global.database.sequelize,
	Game = sequelize.import(__dirname + '/../models/game'),
	User = sequelize.import(__dirname + '/../models/user'),
	_ = require('lodash');

module.exports = {
	get: function(id, cb) {
		Game.findById(id, { include: [User] })
		.then(function(game) {
			if (!game) {
				return cb(new Error("Could not find game with id " + id));
			} else {
				return cb(null, game);
			}
		}).catch(function(error) {
			return cb(error);
		});
	},

	create: function (game, cb) {
		Game.create(game)
		.then(function(game) {
			return cb(null, game);
		}).catch(function(error) {
			return cb(error);
		});
	},

	find: function (options, cb) {
		Game.findAll(options)
		.then(function(games) {
			return cb(null, games);
		}).catch(function(error) {
			return cb(error);
		});
	},

	count: function (options, cb) {
		Game.count(options)
		.then(function(count) {
			cb(null, count);
		}).catch(function(error) {
			return cb(error);
		});
	},

	update: function (game, id, cb) {
		game.id = id;
		// FIXME: has to be a better way to do this with sequelize
		game.save(game)
		.then(function(result) {
			return cb(null, result);
		}).catch(function(error) {
			return cb(error);
		});
	}
};
