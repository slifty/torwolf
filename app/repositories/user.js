var User = global.database.sequelize.import(__dirname + '/../models/user');

module.exports = {
	findByEmail: function (email, cb) {
		User.findOne({
			where: {
				email: email
			}
		}).then(function (user) {
			return cb(null, user);
		}).catch(function (error) {
			return cb(error);
		});
	},

	get: function(id, cb) {
		User.findById(id)
		.then(function(user) {
			if (!user) {
				return cb(new Error("Could not find user with id " + id));
			} else {
				return cb(null, user);
			}
		}).catch(function(error) {
			return cb(error);
		});
	},

	create: function (user, cb) {
		User.create(user)
		.then(function(user) {
			return cb(null, user);
		}).catch(function(error) {
			return cb(error);
		});
	},

	update: function (user, id, cb) {
		User.update(user, { 
			where: { id: id },
			returning: true
		}).then(function(result) {
			return cb(null, result[1][0].dataValues);
		}).catch(function(error) {
			return cb(error);
		});
	}
};