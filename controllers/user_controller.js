
const User=require('../models/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:'Codeial User Profile',
            profile_user:user,
        });
    })
    
}
module.exports.home=function(req,res){
    return res.render('user');
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

module.exports.update_profile=function(req,res){
    console.log("Changed");
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Updated Succesfully');
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}