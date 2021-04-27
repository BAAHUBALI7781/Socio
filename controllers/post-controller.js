const Comment = require("../models/comments");
const Post = require("../models/post");

module.exports.new_post=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id,
        
    },function(err,post){
        if(err)
        {
            console.log('error');
            return;
        }
        return res.redirect('back');
    });

}

module.exports.destroy=function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log('Error');
            return;
        }
        // .id means converting object id to string
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('/');
            });

        }
        else
        {
            return res.redirect('/');
        }
    })
}
