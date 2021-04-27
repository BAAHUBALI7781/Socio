const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.new_post=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id,
        
    },function(err,post){
        if(err)
        {
            console.log('error');
            return;
        }
        return res.redirect('back');
    });
}
