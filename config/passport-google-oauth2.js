const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
            clientID:"45497913421-qgvtooat8lsblc9dpahl11crgnij1s8h.apps.googleusercontent.com",
            clientSecret:"97iz_nBJArWBnxvfSRRdY8tl",
            callbackURL:"http://localhost:8080/user/auth/google/callback"
        },function(accessToken,refreshToken,profile,done){
            User.findOne({email:profile.emails[0].value}).exec(function(err,user){
                if(err){
                    console.log('Error');
                    return;
                }
                console.log(profile);
                if(user){
                    return done(null,user);
                }
                else{
                    User.create({
                        name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes[20].toString('hex')
                    },function(err,user){
                        if(err){
                            console.log('Error');
                            return;
                        }
                        return done(null,user);
                    })
                }
            })
        }
        
        ))

module.exports=passport;