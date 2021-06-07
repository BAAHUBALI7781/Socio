const User = require('../models/user');
const Friendship = require("../models/friends");

module.exports.add_friend=async function(req,res){
    console.log(req.params.id);
    try{
        let user=await User.findById(req.user);
        let friends=user.friends;
        let isFriendship=await friends.find(id=> id==req.params.id);
        if(isFriendship!=undefined){
            console.log("Friend already added");
            return res.redirect('back');
        }
        else
        {
            req.user.friends.push(req.params.id);
            console.log(req.user.friends);
            let frienship=await Friendship.create({
                to:req.params.id,
                from:req.user
            });
            req.user.save();
            res.redirect('back');
        }
    }
    catch(err){
        console.log("Error",err);
        return;
    }
    
}