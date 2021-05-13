const Post = require("../models/post");
const User = require('../models/user');

module.exports.home=async function(req,res){

    //Populate the whole user
    try{
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            populate:{
                path:'likes',
            }
        }).populate('likes');

        let users=await User.find({});

        return res.render('home',{
            title:'Socio Home Page',
            posts:posts,
            users:users,
    
        });
        
    }catch(err){
        console.log("Error",err);
        return;
    }
}

    

