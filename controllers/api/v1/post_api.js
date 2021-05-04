const Post=require('../../../models/post');
const Comment=require('../../../models/comments');
module.exports.index=async function(req,res){

    let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user','user_name')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        console.log(posts);
        return res.json(200,{
        message:'List of posts',
        posts:posts
    })
}

module.exports.destroy=async function(req,res){

    try{
        let post=await Post.findById(req.params.id);
        
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        return res.json(200,{
            message:'Post and associated comments deleted'
        })
    }catch(err){
        return res.json(500,{
            message:'Internal Server Error'
        });
    }

}
