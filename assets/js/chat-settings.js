
class Reply{
    constructor(messageId){
        console.log("**message id",messageId);
        this.reply(messageId);
    }
    reply(messageId){
        $(messageId).click(function(e){
            e.preventDefault();
            let h=$(messageId).attr('href');
            $('#message-input').val(`Replying to ${h}--> `);
            $('#reply-link').val(`${h}`);
        })
    }
}
