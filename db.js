const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const TaskSchema = new mongoose.Schema({
	info: String,		//what the task is
	timeStart: String,	//when the user plans to start it
	timeEnd: String,	//when the user plans to end it
	reward: String		//wha the user plans to treat self with
});

//used for regular logins
const UserSchema = new mongoose.Schema({
	username: String,
	hash: String,
	tasks: [TaskSchema]
});

//used for Facebook logins
const FacebookUserSchema = new mongoose.Schema({
	fbId: String,		//used to find old users and their existing tasks
	tasks: [TaskSchema]
});

mongoose.model('User', UserSchema);
mongoose.model('FbUser', FacebookUserSchema);
mongoose.model('Task', TaskSchema);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configuration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/project';
}

mongoose.connect(dbconf);
