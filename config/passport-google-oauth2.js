const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
            clientID:process.env.SOCIO_GOOGLE_CLIENTID,
            clientSecret:process.env.SOCIO_GOOGLE_CLIENTSECRET,
            callbackURL:process.env.SOCIO_GOOGLE_CALLBACK
        },function(accessToken,refreshToken,profile,done){
            console.log(profile);
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
                    // console.log(crypto.randomBytes(20]);
                    User.create({
                        user_name:profile.displayName,
                        email:profile.emails[0].value,
                        password:crypto.randomBytes(20).toString('hex')
                    },function(err,user){
                        if(err){
                            console.log('Error',err);
                            return;
                        }
                        return done(null,user);
                    })
                }
            })
        }
        
        ))

module.exports=passport;