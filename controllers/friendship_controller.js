const User = require('../models/user');
const Friendship = require("../models/friends");

module.exports.togg_friend=async function(req,res){
    // console.log(req.body);
    try{
        let toggle;
        let friendship=await Friendship.findOne({from:req.user, to:req.query.id});
        console.log("Friendship ",friendship);
        if(friendship!=null){
            toggle=0;
            let index=req.user.friends.indexOf(req.query.id);
            req.user.friends.splice(index,1);
            req.user.save();
            console.log(friendship._id);
            await Friendship.deleteOne( {"_id": friendship._id});

        }
        else{
            toggle=1;
            let friend=await Friendship.create({
                from:req.user,
                to:req.query.id
            });
            req.user.friends.push(req.query.id);
            req.user.save();
        }
        if(req.xhr){
            return res.status(200).json({
                data:{
                    toggle:toggle
                }
            })
        }
        else
        {
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error",err);
        return;
    }
    
}