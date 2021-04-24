
const User=require('../models/user');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("Error in finding user");
            return done(err);
        }
        if(!user || user.password!=password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }
        else{
            return done(null,user);
        }
    });
}));   

// Serializig the user to decide which key to put in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user");
            return done(err);
        }
        return done(null,user);
    })
});

// Check if user is auntheticated
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else
        return res.redirect('/user/sign-in-page');
}

passport.setAunthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie 
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;