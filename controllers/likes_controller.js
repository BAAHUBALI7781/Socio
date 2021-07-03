const Comment = require("../models/comments")
const Like = require("../models/likes")
const Post = require("../models/post")

module.exports.toggleLike=async function(req,res){
    try{
        // likes/toggle?id=hhd&type=Post
        let deleted=false;
        let likeable;
        let category=req.query.but;
        
        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate(`${category}`);
        }
        else{
            likeable=await Comment.findById(req.query.id).populate(`likes`);
        }
        // check if like already exists
        let findLike=await Like.findOne({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type,
            category:category
        });
        if(findLike){
            if(category=='like'){
                likeable.like.pull(req.user);
                likeable.save();
                findLike.remove();
                deleted=true;
            }else if(category=='heart'){
                likeable.heart.pull(req.user);
                likeable.save();
                findLike.remove();
                deleted=true;
            }else if(category=='laugh'){
                likeable.laugh.pull(req.user);
                likeable.save();
                findLike.remove();
                deleted=true;
            }
            
        }
        else{
            let newLike=await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type,
                category:category
            });
            if(category=='like'){
                likeable.like.push(req.user);
            }else if(category=='heart'){
                likeable.heart.push(req.user);
            }else if(category=='laugh'){
                likeable.laugh.push(req.user);
            }
            
            likeable.save();
        }
        if(req.xhr){
            return res.status(200).json({
                message:'Request Successful',
                data:{
                    deleted:deleted,
                    cat:category
                }
            });
        }
        
        return res.redirect('/');



    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal Server Error'
        })
    }
}