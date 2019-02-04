    var express = require('express');

    var Blogs = require('../modules/blogDetails');
    
    var LocalStrategy = require('passport-local').Strategy;
    var OAuthStrategy = require('passport-oauth').OAuthStrategy;


    module.exports = function ( passport) {
         var router = express.Router();
        //const passport = require('passport'); 
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
        
        router.post('/login',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
               
            })
        );
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
                    if (user.password === password) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                    return done(null, user);
                });

            }

        ));
        // res.redirect("/typingpage");




        // GET route after registering
        router.get('/', function (req, res, next) {
            Blogs.findById(req.session.userId)
                .exec(function (error, user) {
                    if (error) {
                        return next(error);
                    } else {
                        if (user === null) {
                            var err = new Error('Not authorized! Go back!');
                            err.status = 400;
                            return next(err);
                        } else {
                            return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email)
                        }
                    }
                });
        });
        return router;
    }

    /* router.post('/login', function (req, res){
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
        return router;
    
    

    } */




    //module.exports = router;