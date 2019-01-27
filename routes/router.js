var express = require('express');
var router = express.Router();
var Blogs = require('../modules/blogDetails');
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
        password:password,
        username:username,
        inputCity:inputCity


    })
    user.save((err, savedInstance) => {
        console.log(err,savedInstance);
        res.render('new_post');

    });



});

module.exports = router;