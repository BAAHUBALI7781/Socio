const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('profile',{
                    title:"User Profile",
                    user:user
                })
            }
            else
                return res.redirect('sign-in-page');
        })
    }
    else
        return res.redirect('sign-in-page');
}
module.exports.home=function(req,res){
    return res.render('user');
}

module.exports.signUpPage=function(req,res){
    return res.render('signup',{
        title:'Codeial Sign-Up Page'
    });
}
module.exports.signInPage=function(req,res){
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
    console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log('Error while finding the user');
            return;
        }
        if(!user)
        {
            console.log("User not Registered");
            return res.redirect('sign-up-page');
        }
        else
        {
            if(user.password!=req.body.password){
                return res.rediect('sign-in-page');
            }

            res.cookie('user_id',user.id);
            return res.redirect('profile');
        }
    })

}


module.exports.signOut=function(req,res){
    delete req.cookies.user_id;
    return res.redirect('sign-in-page');
}
