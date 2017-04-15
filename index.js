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
var Users = require('./models/users');
var Movie = require('./models/movie_info');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

//CREATE USER
app.post('/users/signup', function(req, res){
	var user = req.body;
	
	//var state = new Users(user);
	//res.json(state);
	/*
	state.save(function(error, user){
		if(error) throw error;
		res.json(user);
	});*/
	
	Users.addUser(user, function(error, user){
		if(error) throw error;
		
		res.json(user);
	});
});

app.post('/users/login', function(req, res){
	
	var user = req.body;
	
	var state = new Users({
		id: user.id,
		pw: user.pw
	});
	
	var results = [];
	
	Users.getUsers(function(error, user){
		if(error) throw error;
		res.json(user);
		return user.map(function(data){
			results.push(data);
		});
	});
	
	//res.send(results); 
});

//INSERT favorite movie
app.post('/insert/favorite/movie', function(req,res){
	var movie_info = {
		id: req.body.id,
		original_title: req.body.original_title,
		rating: req.body.rating,
		img: req.body.img
	};
	//res.json(req.body);
	
	Movie.insertMovie(req.body, function(error, movie){
		if(error) throw error;
		
		res.json(movie);
	});
	
});

//UPDATE favorite movie
app.post('/update/favorite/movie', function(req, res){
	var id = mongoose.Types.ObjectId(req.body.id); 
	var movie_info = req.body;
	
	Movie.updateMovie(id, {}, movie_info, function(error, movie){
		if(error) throw error;
		
		res.json(movie);
	})
});

//GET all users registered
app.get('/users/list', function(req, res){
	Users.getUsers(function(error, user){
		if(error) throw error;
		
		res.json(user);
	});
});

//GET all movie lists of each individual
app.get('/favorite/movies', function(req, res){
	Movie.getAllLists(function(error, movies){
		if(error) throw error;
		
		res.json(movies);
	});
});

app.delete('/delete', function(req, res) {
	Users.removeAll(function(error){
		if(error) throw error;
		
		res.send('deleted');
	});
});

app.delete('/favorite/delete', function(req, res) {
	Movie.removeAll(function(error){
		if(error) throw error;
		
		res.send('deleted');
	});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});