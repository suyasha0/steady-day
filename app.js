const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bCrypt = require('bcrypt');

require('./db');

const mongoose = require('mongoose');
const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
	FacebookStrategy = require('passport-facebook').Strategy;
const flash = require('connect-flash');
const Reward = mongoose.model('Reward');
const User = mongoose.model('User');
const FbUser = mongoose.model('FbUser');

const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); 

app.use(bodyParser.urlencoded({extended: false}));

const sessionOptions = {
	secret: 'secret cookie',
	saveUninitialized: false,
	resave: false,
};

//======== Passport setup ========
//Passport code credit: code.tutsplus.com

app.use(session(sessionOptions));
app.use(flash());
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

//======== Local login strategy ========
passport.use('login', new LocalStrategy({
	passReqToCallback: true
	},
  function(req, username, password, done) {
    User.findOne({ Id: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('message', 'User not found.') );
      }
      if (!isValidPassword(user, password)) {
        return done(null, false, req.flash('message', 'Invaid password.'));
      }
      return done(null, user);
    });
  }
));

function isValidPassword(user, password){
  return bCrypt.compareSync(password, user.password);
};

//======== Facebook login strategy ========

const configAuth = {
        'clientID'      : '297047947405381e',
        'clientSecret'  : '6685d6dfec32c5266e7af80bec462e48', 
        'callbackURL'   : '/auth/facebook/callback'
    };
/*
passport.use('facebook', new FacebookStrategy)({
	clientID: configAuth.clientID,
	clientSecret: configAuth.clientSecret,
	callbackURL: configAuth.callbackURL
	},
	function(token, refreshToken, profile, done){
		process.nextTick(function(){
			FbUser.findOne({'Id': profile.id}, function(err, user){
				if(err){
					return done(err);
				}

				if(user){
					return done(null, user);
				} else {
					const newUser = new FbUser();

					newUser.Id = profile.Id;
					newUser.token = token;
					newUser.username = profile.name.displayName;

					newUser.save(function(err){
						if(err){
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}
);
*/
//======== Registration strategy ========

function createHash(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};


passport.use('register', new LocalStrategy({ 
	passReqToCallback: true
	},
	function(req, username, password, done){
		findOrCreateUser = function(){
			User.findOne({'Id': username}, function(err, user){
				if(err){
					console.log("Error in signup. " + err);
					return done(err);
				}
				if(user){
					console.log("User already exists.");
					return done(null, false, 
						req.flash('message', 'Username taken.'));					
				} 
				else{
					const newUser = new User();
					newUser.Id = username;
					newUser.password = createHash(password);

					newUser.save(function(err){
						if(err){
							console.log("Error in saving user: " + err);
							throw err;
						}
						console.log("User registration successful.");
						return done(null, newUser);
					});
				}
			});
		};

		process.nextTick(findOrCreateUser);
		
	}
));


app.get('/', isAuthenticated, (req, res) => {
	res.redirect('/home');
});

//======== Local login/register routes ========

app.get('/login', (req, res) => {
	res.render('login', { message: req.flash('message') });
});

app.post('/login',
  passport.authenticate('login', { successRedirect: '/home',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/register', (req, res) => {
	res.render('register', {message: req.flash('message')});
});

app.post('/register', passport.authenticate('register', {
	successRedirect: '/home',
	failureRedirect: '/register',
	failureFlash: true
}));

app.get('/home', isAuthenticated, (req, res) => {
	res.render('index', {user: req.user || req.fbUser}); //TODO: Add Hello John to home
});

function isAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect('/login');
	}
};

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

//======== Facebook routes ========

/*
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/home',
        failureRedirect : '/'
    })
);
*/

//=================================


app.get('/plan', isAuthenticated, (req, res) => {
	let UserP = User;
	if(req.fbUser){
		userP = FbUser;
	}
	UserP.findOne({Id: req.user.Id || req.fbUser.Id}, function(err, user, count){
		res.render('plan', {task: user.tasks, user: req.user || req.fbUser});
	});
	/*
	Task.find(function(err, task, count){    //later i will change to for each USER
		res.render('plan', {task: task, user: req.user || req.fbUser});
	});*/
});


app.post('/plan', (req, res) => {
	let UserP = User;
	if(req.fbUser){
		userP = FbUser;
	}
	UserP.findOne({Id: req.user.Id || req.fbUser.Id}, function(err, user, count){
		user.tasks.push({info: req.body.info, reward: req.body.reward, done: -1});
		user.save(function(saveErr, saveUser, saveCount){
			if(saveErr){
				console.log("Save error" + saveErr);
				res.send("An error occurred.")
			}
			else{
				res.redirect('/plan');
			}
		});
	});
	/*
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
	}); */
});

app.get('/today', isAuthenticated, (req, res) => {
	let UserP = User;
	if(req.fbUser){
		userP = FbUser;
	}
	UserP.findOne({Id: req.user.Id || req.fbUser.Id}, function(err, user, count){
		const qTasks = user.tasks.filter(function(ele){
			return ele.done === -1;
		});
		res.render('today', {task: qTasks, user: req.user || req.fbUser});
		/*
		Task.find({done: -1}, function(err, task, count){ //later i will change to for each USER
			res.render('today', {task: task, user: req.user || req.fbUser});
		}); */
	});
});

app.post('/today', (req, res) => {
	let UserP = User;
	if(req.fbUser){
		userP = FbUser;
	}
	UserP.findOne({Id: req.user.Id || req.fbUser.Id}, function(err, user, count){

		const qTasks = user.tasks.filter(function(ele){
			return ele.info === req.body.info;
		});

		qTasks.map(function(ele){
			return ele.done = 1;
		});

		user.save(function(saveErr, saveUser, saveCount){
			if(saveErr){
				console.log("Save error" + saveErr);
				res.send("An error occurred.")
			}
			else{
				res.redirect('/today');
			}
		});
	});


	/*
	Task.findOne({info: req.body.info }, function(err, task, count){
		task.update({done: 1}, function(saveErr, saveLink, saveCount){
			if(saveErr){
				console.log(saveErr);
			}
			else{
				res.redirect('/today');
			}
		});
	}); */

});

app.get('/overview', isAuthenticated, (req, res) => {
	res.render('overview', {user: req.user || req.fbUser});
});

app.get('/reward', isAuthenticated, (req, res) => {
	Reward.find(function(err, rewards, count){
		res.render('reward', {rewards: rewards, user: req.user || req.fbUser});
	});
});

app.get('/api/rewards', function(req, res){
	if(!req.query.info){
		Reward.find(function(err, reward, count){
			res.json(reward);
		});
		return;
	};

	Reward.find({info: req.query.info},
		function(err, reward, count){
			res.json(reward);
		});
});

app.post('/api/rewards/create', function(req, res){
	const r = new Reward({
	    info: req.body.info,
	});
	r.save(function(err, reward, count){		//find user and push r into array
		if(err){
			res.send({"error": "There has been an error."})
		}
		else{
			sendAll();
		}
	});

	function sendAll(){
		Reward.find(function(err, reward, count){
			res.json(reward);
		});
	};
});


app.listen(process.env.PORT || 3000);