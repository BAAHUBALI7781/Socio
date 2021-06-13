const crypto=require('crypto');
const User=require('../models/user');
const ResetToken=require('../models/reset-pass-token');
const reset_password=require('../mailers/forgot_password_mailer');

module.exports.send_mail=function(req,res){
    console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error",err);
            return;
        }
        if(!user)
        {
            console.log("User with the entered email not registered!!");
            return;
        }
        else
        {
            ResetToken.create({
                user:user.id,
                accessToken:crypto.randomBytes(20).toString('hex'),
                isValid:true
            },function(err,newToken){
                if(err){
                    console.log('Error while creating token');
                    return;
                }
                else
                {
                    // console.log(`http://localhost:8080/user/reset/?${newToken.accessToken}`);

                    reset_password.forgot_password(`http://www.socio.codes/user/reset_password_page/${newToken.accessToken}`,req.body.email);
                    return res.render("mail_sent",{
                        mail:req.body.email,
                        title:'Reset Password'
                    });
                }
            })
        }
    })
    
}

module.exports.reset_password_page=function(req,res){
    ResetToken.findOne({accessToken:req.params.id},function(err,token){
        if(err){
            console.log('Error in finding token');
            return;
        }
        console.log(token.isValid);
        if(token){
            return res.render('reset_page',{
                token:token,
                title:'Reset Password Page'
            })
        }
    })
}

module.exports.changePassword=function(req,res){
    ResetToken.findOne({accessToken:req.params.id},function(err,token){
        if(err){
            console.log('Error in finding token');
            return;
        }
        if(token){
            User.findById(token.user,function(err,user){
                if(err)
                {
                    console.log('Error in finding the user');
                    return;
                }
                if(user){
                    if(req.body.pass!=req.body.confirm_pass)
                    {
                        console.log("Passwords do not match!!");
                        req.flash('error','Passwords do not match');
                        res.redirect(`/user/reset_password_page/${token.accessToken}`);
                    }
                    else
                    {
                        console.log(user.password,req.body.pass);
                        user.password=req.body.pass;
                        user.save();
                        console.log('Password changed');
                        token.isValid=false;
                        token.save();
                        console.log(token);
                        req.flash('success','Password changed');
                        return res.redirect('/user/sign-in-page');
                    }
                }
            })
        }
    })
}