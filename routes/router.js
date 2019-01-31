    var express = require('express');
    var router = express.Router();
    var Blogs = require('../modules/blogDetails');
    const passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var OAuthStrategy = require('passport-oauth').OAuthStrategy;


    router.get('/', function (req, res) {
        res.render('index');
    });
    router.get('/new_post', function (req, res) {
        res.render('new_post')
    });
    router.get('/signUp', function (req, res) {
        res.render('signUp');
    });
    router.get('/login', function (req, res) {
        res.render('login')
    });
    router.post('/signUp', function (req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;
        let inputCity = req.body.inputCity;

        let user = new Blogs({
            email: email,
            password: password,
            username: username,
            inputCity: inputCity


        })
        user.save((err, savedInstance) => {
            console.log(err, savedInstance);
            res.render('new_post');

        });

    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/new_post',
            failureRedirect: '/',
            failureFlash: true

        })

    });

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Blogs.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use(new LocalStrategy(
    function (username, password, done) {
        Blogs.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
    ));


    
    module.exports = router;