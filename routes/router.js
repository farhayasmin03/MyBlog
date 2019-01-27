var express = require('express');
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
router.get('/login',function(req,res){
    res.render('login')
});
module.exports = router;