var cool     = require('cool-ascii-faces');
var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200); 
    }
    else {
      next();
    }
};  

app.set('port', (process.env.PORT || 8080));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(allowCrossDomain);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGODB_URI);

// DEFINE MODEL
var Books = require('./models/books');
var Users = require('./models/users');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

// GET ALL BOOKS
app.get('/books', function(req,res){
  Books.find(function(err, books){
    if(err) return res.status(500).send({error: 'database failure'});
    res.json(books);
  });
});

//CREATE USER
app.post('/users/signup', function(req, res){
	var user = req.body;
	/*
	var test = new Users({
		id: user.id,
		pw: user.pw
	});
	test.save(function(err){if(err) console.log('error')});
	*/
	
	Users.addUser(user, function(error, user){
		if(error) throw error;
		
		
		res.json(user);
	});
});

app.delete('/delete', function(req, res) {
	Users.removeAll(function(){
		if(error) throw error;
		
		res.send('deleted');
	});
});

app.get('/users/list', function(req, res){
	Users.getUsers(function(error, user){
		if(error) throw error;
		
		res.json(user);
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});