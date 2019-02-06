var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const passport = require('passport');
var blogSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    inputCity:{
        type:String,
        required:true,
        trim:true
    }
});

//authenticate input against database
blogSchema.statics.authenticate = function (email, password, callback) {
    Blogs.findOne({
        email: email
      })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
  
  //hashing a password before saving it to the database
  blogSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });
  
var Blogs=mongoose.model('Blogs',blogSchema);
module.exports=Blogs;
