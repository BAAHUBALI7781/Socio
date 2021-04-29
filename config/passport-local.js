

const User=require('../models/user');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},function(req,email,password,done){
    User.findOne({email:email},function(err,user){
        if(err)
        {
            req.flash('error',)
            console.log("Error while finding user");
            return done(err);
        }
        else if(!user || (password!=user.password)){
            req.flash('error','Invalid Username/Password');
            return done(null,false);
        }
        else
        {
            return done(null,user);
        }
    });
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error finding user");
            return done(err);
        }
            return done(null,user); 
    }) 
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/user/sign-in-page');
    }
};

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
};

module.exports=passport;





















