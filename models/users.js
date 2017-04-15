var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({
  id	:	{ type: String },
  pw	:	{ type: String }
});

var User = module.exports = mongoose.model('User', usersSchema);

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