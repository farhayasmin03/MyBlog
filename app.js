    var express = require('express');

    var app = express();
    app.set('view engine', 'ejs');
    const bodyparser = require('body-parser');

    app.use(bodyparser.urlencoded({
        extended: true
    }));

    app.use(bodyparser.json());
    var routes = require('./routes/router')(app,passport);
    var session = require('express-session')
    var passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;

    //use sessions for tracking logins
    app.use(session({
        secret: 'work hard',
        resave: true,
        saveUninitialized: false,

    }));
    app.use(passport.initialize());
    app.use(passport.session());


    app.use('/', routes);
    app.use(express.static(__dirname + '/public'));

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/blogdb')
    var db = mongoose.connection

    //handling error
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
        console.log('we are connected')
    });
    

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    });
    module.exports = app;