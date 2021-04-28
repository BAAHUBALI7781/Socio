const Comment = require("../models/comments");
const Post = require("../models/post");
const { post } = require("../routes/comments");


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
    });
}
  
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            console.log('Error in finding comment');
            return;
        }
        Post.findById(comment.post,function(err,post){
            var post_user_id=post.user;
            if(comment.user==req.user.id || post_user_id==req.user.id){
                let postId=comment.post;
                comment.remove();
                Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                    return res.redirect('/');
                });
            }
            else
                return res.redirect('/');
        });
        
        
    })
        

    
}