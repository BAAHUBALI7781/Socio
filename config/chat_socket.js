const moment=require('moment');

module.exports.chatSocket = function(chatServer){
    let io = require('socket.io')(chatServer);
    
    io.sockets.on('connection', function(socket){
        console.log('new connection received', socket.id);
        socket.on('disconnect', function(){
            console.log("Socket disconnected");
        });
        socket.on('join_room',function(data){
            console.log("Joining room!",data);
            socket.join(data.room_id);
            io.in(data.room_id).emit('user_join',data);
        });
        socket.on('send',function(data){
            console.log(data);
            io.in(data.room_id).emit('receive',data);
        })
        
    });

}