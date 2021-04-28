
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
        title:'Codeial Sign-Up Page'
    });
}
module.exports.signInPage=function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/user/profile');
    }
    return res.render('signin',{
        title:'Codeial Sign-In Page'
    });
}
module.exports.sign_up=function(req,res){
    if(req.body.password!=req.body.confirm_password)
    {
        console.log("Password doesn't match");
        return res.redirect('sign-up-page');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding the user');
            return;
        }
        if(!user){
            User.create(req.body,function(err,newUser){
                if(err){
                    console.log('Error in creating account');
                    return res.redirect('/');
                }
                else
                {
                    console.log('Created successfully');
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
    return res.redirect('/');
}

module.exports.sign_out=function(req,res){
    req.logout();
    return res.redirect('/');
}

module.exports.update_profile=function(req,res){
    console.log("Changed");
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            console.log("Done");
            return res.redirect('back');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}