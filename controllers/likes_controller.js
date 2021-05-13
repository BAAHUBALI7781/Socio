const Comment = require("../models/comments")
const Like = require("../models/likes")
const Post = require("../models/post")

module.exports.toggleLike=async function(req,res){
    try{
        // likes/toggle?id=hhd&type=Post
        let deleted=false;
        let likeable;
        if(req.query.type=='Post'){
            likeable=await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable=await Comment.findById(req.query.id).populate('likes');
        }

        // check if like already exists
        let like=await Like.findOne({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        });
        if(like){
            likeable.likes.pull(like._id);
            likeable.save();
            like.remove();
            deleted=true;
        }
        else{
            let newLike=await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        if(req.xhr){
            return res.status(200).json({
                message:'Request Successful',
                data:{
                    deleted:deleted,
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