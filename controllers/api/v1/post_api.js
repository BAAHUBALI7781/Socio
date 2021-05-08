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
        console.log(req.params.id);
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
                
            return res.json(200,{
                message:'Post and associated comments deleted'
            });
        }else{
            return res.json(401,{
                message:'You cannot delete this post'
            })
        }
        
    }catch(err){
        return res.json(500,{
            message:'Internal Server Error'
        });
    }

}
