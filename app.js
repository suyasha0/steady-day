const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

//require('./db');

const mongoose = require('mongoose');
//const User = mongoose.model('User');

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

app.listen(3000);