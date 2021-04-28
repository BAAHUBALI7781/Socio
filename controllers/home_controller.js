const Post = require("../models/post");
const User = require('../models/user');

module.exports.home=function(req,res){
    
    
    //Populate the whole user
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,Posts){
            // console.log();
            User.find({},function(err,users){
                return res.render('home',{
                    title:'Socio Home Page',
                    posts:Posts,
                    users:users,
                })
            });
            
        
    });

}