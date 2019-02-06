    var express = require('express');

    var Blogs = require('../modules/blogDetails');
    var Blogs1 = require('../modules/blogDetails1');
    const passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    
    var OAuthStrategy = require('passport-oauth').OAuthStrategy;


    module.exports = function (app,passport) {
        var router = express.Router();
        

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
        router.post('/new_post',function(req,res){
            let text = req.body.text;
            if (!text) {
                return res.send("Text is empty");
            }
            
        
            let blog = new Blogs1({
                text: text,
                
            });
        
            blog.save((err, savedInstance) => {
                res.json(savedInstance);
                console.log(savedInstance)
            });
        
        })
         /* passport.use(new LocalStrategy(
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

        )); */
 
        
            /* router.post('/login',
                passport.authenticate('local',
                {successRedirect: '/new_post',failureRedirect: '/',failureFlash: true}),
                function (req, res) {
                   console.log('authentication');
                    
                });
                passport.serializeUser(function(user, done) {
                    done(null, user.id);
                  });
                  

            passport.deserializeUser(function (id, done) {
                Blogs.findById(id, function (err, user) {
                    done(err, user);
                });
            }); */
             
            //console.log("loggedin!!!!")

        


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

    