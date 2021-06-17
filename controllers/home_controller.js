const { populate } = require("../models/post");
const Post = require("../models/post");
const User = require('../models/user');

let pop=async function(posts)
{
    for(postx of posts)
        {
            for(commentx of postx.comments)
            {
                await commentx.populate('user user_name').execPopulate();
            }
        }
}
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
        await pop(posts);
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
module.exports.socio_room=function(req,res){
    res.render('_chat-box.ejs',{
        title:'Socio Chat Room'
    });
}