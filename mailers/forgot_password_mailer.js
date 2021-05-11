const nodemailer=require('../config/nodemailer');

exports.forgot_password=(link,mail)=>{
    let htmlString=nodemailer.renderTemplate({link},'./reset_password/reset.ejs')
    nodemailer.transporter.sendMail({
        from:'socio.510818090',
        to:mail,
        subject:'Reset Password',
        html:htmlString
        
    },function(err){
        if(err){
            console.log("Email not sent");
            return;
        }
        else{
            console.log("Mail Sent")
        }
    })
}
