const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./db');

const mongoose = require('mongoose');
const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
const Task = mongoose.model('Task');
const User = mongoose.model('User');

const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); 

app.use(bodyParser.urlencoded({extended: false}));

const sessionOptions = {
	secret: 'secret cookie',
	resave: false,
	saveUninitialized: false
};

//for passport
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(session(sessionOptions));

app.get('/', (req, res) => {
	res.render('index');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/plan', (req, res) => {
	Task.find(function(err, task, count){    //later i will change to for each USER
		res.render('plan', {task: task});
	});
});

app.post('/plan', (req, res) => {
	const task = new Task({
		info: req.body.info,
		reward: req.body.reward
	}).save(function(err, task, count){
		if(err){
			console.log("err");
			res.send("An error occurred.")
		}
		else{
			res.redirect('/plan');
		}
	});
});

app.get('/today', (req, res) => {
	Task.find({done: -1}, function(err, task, count){ //later i will change to for each USER
		res.render('today', {task: task});
	});
});

app.post('/today', (req, res) => {
	Task.findOne({ info: req.body.info }, function(err, task, count){
		task.update({done: 1}, function(saveErr, saveLink, saveCount){
			if(saveErr){
				console.log(saveErr);
			}
			else{
				res.redirect('/today');
			}
		});
	});

});

app.listen(process.env.PORT || 3000);