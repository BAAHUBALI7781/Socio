const Post = require("../models/post");


module.exports.home=function(req,res){
    
    
    //Populate the whole user
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,Posts){
            // console.log();
            return res.render('home',{
                title:'Codeial Home Page',
                posts:Posts
            })
        
    });

}