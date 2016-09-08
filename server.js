/**
 * Main application file
 **/
 
 
'use strict';

var port = process.env.PORT || 8080;

var express = require('express');
var path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var routes = require('./app/routes.js');

var app = express();
require('dotenv').load();
require('./app/config/passportTwitter') (passport);

mongoose.connect(process.env.MONGODB_URI);

app.use('/public', express.static(path.resolve(__dirname, '/public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'SoSecret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(cookieParser());

routes(app, passport);

app.listen(port, function() {
    console.log('Node.js is listening for you on port: ' + port + ".");
})