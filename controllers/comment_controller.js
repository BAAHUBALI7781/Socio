const Comment = require("../models/comments");
const Post = require("../models/post");


module.exports.add_comment=function(req,res){
    // console.log(req.query);
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post,
                
            },function(err,comment){
                if(err){
                    console.log("error");
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });

        }
    })
}
  