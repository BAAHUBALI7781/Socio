
class ChatEngine{
    constructor(chatBoxId, userEmail, userName){
        console.log(userName);
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName=userName;
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
            user_name:self.userName,
            room_id:'Socio chatroom'
        });
        self.socket.on('user_join',function(data){
            console.log("A new user joined",data);
        });

        $('#send-message').click(function(){
            let msg=$('#message-input').val();
            if(msg!='')
            {
                self.socket.emit('send',{
                    username:self.userName,
                    message:msg,
                    user_email:self.userEmail,
                    room_id:'Socio chatroom',
                    
                });
            }
        });
        self.socket.on('receive',function(data){
            var date=new Date();
            data.time=date.toLocaleString('en-GB').slice(0,-3).substring(11);
          
            let newdiv=document.createElement('div');
            newdiv.classList.add('seperate-message');
            if(data.user_email==self.userEmail)
            {
                newdiv.innerHTML=`
                    <div class="details" id="user_detail">
                        <span>${data.username} | </span>
                        <span>${data.time}</span>
                    </div>
                    <div class="message">
                        <span>${data.message}</span>
                    </div>
            `
            }
            else{
                newdiv.innerHTML=`
                    <div class="details">
                        <span>${data.username} | </span>
                        <span>${data.time}</span>
                    </div>
                    <div class="message">
                        <span>${data.message}</span>
                    </div>
            `
            }
            $('#message-list-container').append(newdiv);
            console.log(newdiv);
            const messageContainer=document.getElementById('message-list-container');
            messageContainer.scrollTop=messageContainer.scrollHeight;  
     
    });
}
}