const Post = require("../models/post");
const User = require('../models/user');

module.exports.home = async function(req, res){

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');
        for(postx of posts)
        {
            for(commentx of postx.comments)
            {
                commentx.populate('user user_name').execPopulate();
            }
        }
        let currUser;
        if(req.user){
            currUser = await User.findById(req.user._id)
            .populate('friends');
        }
        
        let users=await User.find({});
        return res.render('home', {
            title: "Socio | Home",
            posts:  posts,
            users: users,
            currUser:currUser
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
   
}
