const nodemailer=require('../config/nodemailer');

exports.newComment=(comment)=>{

    let htmlString=nodemailer.renderTemplate({comment:comment},'./comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:'socio.510818090',
        to:comment.user.email,
        subject:'New comment published',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        else{
            console.log('Mail sent');
            return;
        }
    })
}