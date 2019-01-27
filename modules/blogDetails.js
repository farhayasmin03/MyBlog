var mongoose = require('mongoose');
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
var Blogs=mongoose.model('Blogs',blogSchema);
module.exports=Blogs;