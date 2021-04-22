const User=require('../models/user');


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
    User.create({
        user_name:req.body.user_name,
        email:req.body.email,
        password:req.body.password
    },function(err,newUser){
        if(err){
            console.log('Error in creating account');
            return res.redirect('/');
        }
        else
        {
            console.log('Created successfully');
            return res.redirect('/');
        }
    })
}
    

module.exports.signin=function(req,res){
    // User.create()
}

