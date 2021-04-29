const Comment = require("../models/comments");
const Post = require("../models/post");


module.exports.add_comment=async function(req,res){
    try{
        post=await Post.findById(req.body.post);
        if(post){
            comment=await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post,
                
            });
            post.comments.push(comment);
            post.save();
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
        let comment=await Comment.findById(req.params.id);
        let post=await Post.findById(comment.post);
        if(comment.user==req.user.id || post.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});

            req.flash('success','Deleted Comment');
            return res.redirect('back');
        }
        else{

            req.flash('error','Unauthorized User');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','Error in deleting comment');
        console.log("Error,err");
        return;
    }
}