const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const TaskSchema = new mongoose.Schema({
	info: String,		//what the task is
	reward: String,		//what the user plans to treat self with
	done: {type: Number, default: -1}      	//1 for done, -1 for not done
});

const RewardSchema = new mongoose.Schema({
	info: String
});

//used for regular logins
const UserSchema = new mongoose.Schema({
	Id: String,
	password: String,
	tasks: [TaskSchema],
	rewards: [RewardSchema]
});


mongoose.model('User', UserSchema);
mongoose.model('Task', TaskSchema);
mongoose.model('Reward', RewardSchema);


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
