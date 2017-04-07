const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./db');

const mongoose = require('mongoose');
const Task = mongoose.model('Task');

const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); 

app.use(bodyParser.urlencoded({extended: false}));

const sessionOptions = {
	secret: 'secret cookie',
	resave: true,
	saveUninitialized: true
};

app.use(session(sessionOptions));


app.get('/', (req, res) => {
	res.render('index');
});

/*
app.get('/register', (req, res) => {
	
});
*/

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
	})
});

app.listen(process.env.PORT || 3000);