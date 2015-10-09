var sequelize = global.database.sequelize;
var Game = sequelize.import(__dirname + '/../models/game');

module.exports = {
	get: function(id, cb) {
		Game.findById(id)
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
	}
};
