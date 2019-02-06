var mongoose = require('mongoose');
var blogSchema1=new mongoose.Schema({
    text:{
        type:String,
        require:true
    }
});
var Blogs1=mongoose.model('Blogs1',blogSchema1);
module.exports=Blogs1;
