const Comment = require("../models/comments");
const Like = require("../models/likes");
const Post = require("../models/post");
const multer=require('multer');

module.exports.new_post=async function(req,res){
    
    try{
        let post;
        await Post.uploadedAvatar(req,res,function(err){
            if(err){
                console.log("Error in multer",err);

            }
            else
            {
                let image;
                if(req.file){
                    
                    image=Post.postPath+'/'+req.file.filename;
                    console.log("***Image*** ",image);
                }
                
                Post.create({
                    content:req.body.content,
                    user:req.user._id,
                    avatar:image
                },async function(err,newPost){
                    if(err){
                        console.log("Error in creating post");
                        return res.redirect('/');
                    }
                    
                    if(req.xhr){
                        console.log("Inside xhr");
                        await newPost.populate('user','user_name').execPopulate();
                        return res.status(200).json({
                            data:{
                                post:newPost,
                            },
                            message:'Post created',
                        });       
                    }
                    console.log("****POST created***");
                    req.flash('success','Post Created');
                    return res.redirect('back');
                    
                });
            }
        });
        
        

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

            // Remove the likes assoc. with the post and its comments
            await Like.deleteMany({likeable:post._id,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}}) 

            post.remove();
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id,
                    },
                    message:'Post Deleted'
                })
                
            }
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
