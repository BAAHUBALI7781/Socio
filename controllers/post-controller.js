const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.new_post=async function(req,res){
    
    try{
        post=await Post.create({
            content:req.body.content,
            user:req.user._id,
            
        });
        req.flash('success','Post Created');
        return res.redirect('back');

    }
    catch(err){
        req.flash('error','Error in posting. Try Again');
        console.log("Error",err);
        return;
    }

}

module.exports.destroy=async function(req,res){

    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','Post Deleted');
            return res.redirect('/');
        }
        else
        {
            req.flash('error','Unauthorized User');
            return res.redirect('/');
        }
    }catch(err){
        req.flash('error','Error in deleting post');
        console.log("Error",err);
        return;
    }

}
