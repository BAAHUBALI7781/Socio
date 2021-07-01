
const {WebD,ML,IP,CP} = require('../models/chat');

module.exports.chat=async function(req,res){
    let chats;
    const room=req.params.room;
    if(room=='Web-Development')
    {
        chats=await WebD.find({});
    }else if(room=='Machine-Learning'){
        chats=await ML.find({});
    }else if(room=='Competitive-Programming'){
        chats=await CP.find({});
    }else if(room=='Interview-Preparation'){
        chats=await IP.find({});
    }
    res.render('_chat-box.ejs',{
        title:`Socio ${req.params.room} Room`,
        messages:chats,
        room:req.params.room
    });
}