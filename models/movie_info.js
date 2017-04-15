var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var movie_info = new Schema({
	id	: String,
	original_title	: String,
	rating	: Number,
	img		: String,
	test	: [{
		title: String
	}]
});

var MovieInfo = module.exports = mongoose.model('MovieInfo', movie_info);

module.exports.getAllLists = function(cb) {
	MovieInfo.find(cb);
} 

module.exports.insertMovie = function(movie_info, cb) {
	console.log(movie_info);
	var state = new MovieInfo({
		id	: movie_info.id,
		original_title	: movie_info.original_title,
		rating			: movie_info.rating,
		img				: movie_info.img,
		test			: {
			title: movie_info.test
		}
	});
	state.save(cb);
}

module.exports.updateMovie = function(id, options, movie_info, cb) {
	var id = { _id: id};
	var update = { $push: {"test": {title: movie_info.title}} };
	var options = {};
	MovieInfo.findByIdAndUpdate(id, update, options, cb);
}

module.exports.removeAll = function(cb) {
	MovieInfo.remove(cb);
}

/*
module.exports.addUser = function(user, cb) {
	var state = new User({
		id: user.id,
		pw: user.pw
	});
	state.save(cb);
};

module.exports.login = function(user, cb) {
	var state = new User({
		id: user.id,
		pw: user.pw
	});
	User.findOne(state, cb);
}

module.exports.getUsers = function(cb) {
	console.log('user:');
	User.find(cb);
}

module.exports.removeAll = function(cb) {
	User.remove(cb);
}
*/