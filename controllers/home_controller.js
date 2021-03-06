const Chat = require("../models/chat");
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
module.exports.home_page=function(req,res){
    return res.render('home_page',{
        title:'Socio | Home'
    })
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
        
        return res.render('home', {
            title: "Socio | Blogs",
            posts:  posts,
            currUser:currUser
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
   
}
module.exports.socio_room=async function(req,res){
    res.render('_chatbox-intro.ejs',{
        title:`Socio Chat Room`
    });
}

module.exports.friend=async function(req,res){
    try{
        let friends=req.user.friends;
        let posts = await Post.find({user:{$in:friends}})
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
            title: "Socio | Friends' Posts",
            posts:  posts,
            users: users,
            currUser:currUser
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.users=async function(req,res){
    let users=await User.find({});
    let currUser;
    if(req.user){
        currUser = await User.findById(req.user._id)
        .populate('friends');
    }
    return res.render('users',{
        title:'Socio | Users',
        users:users,
        currUser:currUser
    });
}