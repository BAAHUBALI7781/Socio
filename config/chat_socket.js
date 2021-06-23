
const Chat = require('../models/chat');
module.exports.chatSocket = function(chatServer){
    let io = require('socket.io')(chatServer);
    
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log("Socket disconnected");
        });
        socket.on('join_room',async function(data){
            var date=new Date();
            data.date=date.toLocaleString('en-GB').substring(0,10);
            data.time=date.toLocaleString('en-GB').slice(0,-3).substring(11);
            console.log("***",data.date, data.time)
            const newMessage=await Chat.create(data);
            socket.join(data.room_id);
            io.in(data.room_id).emit('user_join',data);
        });
        socket.on('send',async function(data){
            var date=new Date();
            data.date=date.toLocaleString('en-GB').substring(0,10);
            data.time=date.toLocaleString('en-GB').slice(0,-3).substring(11);
            const newMessage=await Chat.create(data);
            io.in(data.room_id).emit('receive',data);
        })
        
    });

}