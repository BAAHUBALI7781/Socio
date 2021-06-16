
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://18.212.35.2:5000',{transports:['websocket', 'polling', 'flashsocket']});

        if (this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');
        });
        self.socket.emit('join_room',{
            user_email:self.userEmail,
            room_id:'Socio chatroom'
        });
        self.socket.on('user_join',function(data){
            console.log("A new user joined",data);
        });

        $('#send-message').click(function(){
            let msg=$('#message-input').val();
            console.log(msg);
            if(msg!='')
            {
                self.socket.emit('send',{
                    message:msg,
                    user_email:self.userEmail,
                    room_id:'Socio chatroom'
                });
            }
        });
        self.socket.on('receive',function(data){
            console.log('Message : ',data.message);
            let newMessage=$('<li>');
            let messageType='receive-message';

            if(data.user_email==self.userEmail){
                messageType='message-send';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.addClass(messageType);
            $('.message-list').append(newMessage);
            updateScroll();            

    });
}
}
// function updateScroll(){
//     var element = document.getElementById("message-list-container");
//     element.scrollTop = element.scrollHeight;
// }