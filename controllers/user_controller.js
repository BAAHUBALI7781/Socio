
const User=require('../models/user');
const fs=require('fs');
const path=require('path');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:'Socio User Profile',
            profile_user:user,
        });
    })
    

}
module.exports.profile2=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile2',{
            title:'Socio User Profile',
            profile_user:user,
        });
    })
    

}

module.exports.update_profile=async function(req,res){
    
    if(req.user.id==req.params.id){
        try{
            user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer Error',err);
                }
                else{
                    user.user_name=req.body.user_name;
                    user.email=req.body.email;
                    if(req.file){
                        if(user.avatar){
                            if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                            }
                            
                        }
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                    }
                    user.save();
                    req.flash('success','Updated Succesfully');
                    return res.redirect('back');
                }
            })
            
            
        }catch(err){
                req.flash('error',err);
                return res.redirect("back");
        }
            
    }
    else{
        req.flash('error','Unauthorized')
        return res.status(401).send('Unauthorized');
    }  
}

module.exports.signUpPage=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('signup',{
        title:'Socio Sign-Up Page'
    });
}
module.exports.signInPage=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('signin',{
        title:'Socio Sign-In Page'
    });
}
module.exports.sign_up=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        req.flash('error','Passwords does not match')
        return res.redirect('sign-up-page');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            req.flash('error','Some error occured');
            return;
        }
        if(!user){
            User.create(req.body,function(err,newUser){
                if(err){
                    req.flash('error','Error in creating account');
                    return res.redirect('/');
                }
                else
                {
                    req.flash('success','Account created succesfully');
                    return res.redirect('sign-in-page');
                }
            })
        }
        else{
            console.log('Email exists!!');
            return res.redirect('sign-in-page');
        }
    })
    
}
    

module.exports.sign_in=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.sign_out=function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}

module.exports.forget_email_page=function(req,res){
    return res.render('forget_email',{
        title:'Forgot Password'
    });
}