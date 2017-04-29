const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bCrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

require('./db');

const mongoose = require('mongoose');
const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
	FacebookStrategy = require('passport-facebook').Strategy;
const flash = require('connect-flash');
const Reward = mongoose.model('Reward');
const User = mongoose.model('User');

const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); 

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

const sessionOptions = {
	secret: 'beepboop'
};

//======== Passport setup ========
//Passport code credit: code.tutsplus.com

app.use(session(sessionOptions));
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(flash());

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
        'clientID'      : '297047947405381',
        'clientSecret'  : '6685d6dfec32c5266e7af80bec462e48', 
        'callbackURL'   : '/auth/facebook/callback'
    };

passport.use(new FacebookStrategy({
	clientID: configAuth.clientID,
	clientSecret: configAuth.clientSecret,
	callbackURL: configAuth.callbackURL
	},
	function(accessToken, refreshToken, profile, done){
		process.nextTick(function(){
			User.findOne({'Id': profile.id}, function(err, user){
				if(err){
					return done(err);
				}

				if(user){
					return done(null, user);
				} 
				else {
					const newUser = new User();

					newUser.Id = profile.id;

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
));

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
	res.redirect('/today');
});

//======== Local login/register routes ========

app.get('/login', (req, res) => {
	res.render('login', { message: req.flash('message') });
});

app.post('/login',
  passport.authenticate('login', { successRedirect: '/today',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/register', (req, res) => {
	res.render('register', {message: req.flash('message')});
});

app.post('/register', passport.authenticate('register', {
	successRedirect: '/today',
	failureRedirect: '/register',
	failureFlash: true
}));

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


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect : '/' }),
    function(req, res){
    	res.redirect('/plan');
    });


//=================================


app.get('/plan', isAuthenticated, (req, res) => {
	User.findOne({Id: req.user.Id}, function(err, user, count){
		res.render('plan', {user: req.user, task: user.tasks, rewards: user.rewards});
	});

});


app.post('/plan', (req, res) => {
	User.findOne({Id: req.user.Id}, function(err, user, count){
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

});

app.get('/today', isAuthenticated, (req, res) => {

	User.findOne({Id: req.user.Id}, function(err, user, count){
		const qTasks = user.tasks.filter(function(ele){
			return ele.done === -1;
		});
		const dTasks = user.tasks.filter(function(ele){
			return ele.done === 1;
		});
		res.render('today', {qTasks: qTasks, dTasks: dTasks, user: req.user});

	});
});

app.post('/today', (req, res) => {

	User.findOne({Id: req.user.Id}, function(err, user, count){

		const qTasks = user.tasks.filter(function(ele){
			return ele.info === req.body.info;
		});

		newTasks = qTasks.map(function(ele){
			return ele.done = 1;
		});

		for(let i=0; i<qTasks.length; i++){
			qTasks[i] = newTasks[i];
		}

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

});

app.get('/reward', isAuthenticated, (req, res) => {

	User.findOne({Id: req.user.Id }, function(err, user, count){
		res.render('reward', {rewards: user.rewards, user: req.user });
	});
});

app.get('/api/rewards', function(req, res){


	if(!req.query.info){
		User.findOne({Id: req.user.Id}, function(err, user, count){
			res.json(user.rewards);
		});
		return;
	};

	User.findOne({Id: req.user.Id}, function(err, user, count){
		const rewardsQ = user.rewards.filter(function(ele){
			return ele.info === req.query.info;
		});

		res.json(rewardsQ);
	});


});

app.post('/api/rewards/create', function(req, res){

	User.findOne({Id: req.user.Id }, function(err, user, count){
		user.rewards.push({info: req.body.info});
		user.save(function(saveErr, saveUser, saveCount){
			if(saveErr){
				console.log("Save error" + saveErr);
				res.send("An error occurred.")
			}
			else{
				sendAll();
			}
		});
	});

	function sendAll(){
		User.findOne({Id: req.user.Id }, function(err, user, count){
			res.json(user.rewards);
		});
	};
});

app.get('/overview', isAuthenticated, (req, res) => {

	User.findOne({Id: req.user.Id }, function(err, user, count){
		const dTasks = user.tasks.filter(function(ele){
			return ele.done === 1;
		});
		const nTasks = user.tasks.filter(function(ele){
			return ele.done === -1;
		});
		res.render('overview', {dTasks: dTasks, nTasks: nTasks, user: req.user});

	});


});

app.listen(process.env.PORT || 3000);