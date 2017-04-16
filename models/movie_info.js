var mongoose = require('mongoose');
var util = require('util');
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
		test			: [{
			title: movie_info.test
		},{title:'test'}]
	});
	state.save(cb);
}

module.exports.updateMovie = function(username, data_original, data_update, cb) {
	
	MovieInfo.update({'id': username, 'test.title': data_original},
					 { '$set': {
						'test.$.title': data_update
					 }},
					 cb
	);
	/*
	MovieInfo.update({'id': 'pewpew', 'test.title': 'hi'},
					 { '$set': {
						'test.$.title': 'hello world'
					 }},
					 cb
	);*/
	//MovieInfo.update(condition, update, cb);
	/*
	var condition = { test: {$elemMatch: {title: movie_info.title}}};
	var update = { $set: { "test": {title: 'hey~'} }};
	var options = {};
	*/
	
	//MovieInfo.findOneAndUpdate(condition, update, options, cb);
	//MovieInfo.findOneAndUpdate(condition, update, cb);
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