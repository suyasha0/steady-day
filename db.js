const mongoose = require('mongoose');

// Schema first draft

//used for regular logins
const UserSchema = new mongoose.Schema({
	username: String,
	hash: String,
	tasks: [Task]
});

//used for Facebook logins
const FacebookUserSchema = new mongoose.Schema({
	fbId: String,		//used to find old users and their existing tasks
	tasks: [Task]
});

const TaskSchema = new mongoose.Schema({
	user: UserSchema,
	info: String,		//what the task is
	timeStart: String.	//when the user plans to start it
	timeEnd: String,	//when the user plans to end it
	reward: String		//wha the user plans to treat self with
});

mongoose.model('User', UserSchema);
mongoose.model('FbUser', FacebookUserSchema);
mongoose.model('Task', TaskSchema);

mongoose.connect('mongodb://localhost/project');
