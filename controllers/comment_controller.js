const Comment = require("../models/comments");
const Post = require("../models/post");
const commentMailer=require('../mailers/comment_mailer');
const Like=require('../models/likes');

module.exports.add_comment=async function(req,res){
    try{
        let post=await Post.findById(req.body.post);
        if(post){
            
            let comment=await Comment.create({
                
                content:req.body.content,
                user:req.user._id,
                post:req.body.post,
                
            });
            post.comments.push(comment);
            post.save();
            comment=await comment.populate('user','user_name email').execPopulate();
            
            // Queuing mails
            commentMailer.newComment(comment);
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message:'Comment Added'

                });
                
            }
            req.flash('success','Added Comment');
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error','Error in adding Comment');
        console.log("Error,err");
        return;
    }

}
  
module.exports.destroy=async function(req,res){
    try{
        console.log("Inside comment controller");
        let comment=await Comment.findById(req.params.id);
        let post=await Post.findById(comment.post);
        if(comment.user==req.user.id){
            let postId=comment.post;
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            console.log("Hello Comments!");
            if (req.xhr){
                console.log("Inside comment xhr");
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success','Deleted Comment');
            return res.redirect('back');
        }
        else{

            req.flash('error','Unauthorized User');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error in deleting comment');
        console.log("Error",err);
        return;
    }
}