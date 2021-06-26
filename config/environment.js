const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const log_directory=path.join(__dirname,'../production_logs');

fs.existsSync(log_directory) || fs.mkdirSync(log_directory);
const accessLogStream=rfs.createStream('access.log',{
    interval:'1d',
    path:log_directory
});
const development={
    name:'development',
    asset_path:'./assets',
    session_cookie:'something',
    db:'socio_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'socio.510818090',
            pass: 'Hello@12345'
        }
    }, 
    google_clientID:"45497913421-0iodb43ql7b71jislmkr387qj9jja4vq.apps.googleusercontent.com",
    google_clientSecret:"h5a29lJMayiff5dQXDd03tac",
    google_callbackURL:"http://localhost:8080/user/auth/google/callback",
    jwt_secret:'Socio',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}
const production={
    name:'production',
    asset_path: process.env.SOCIO_ASSET_PATH,
    session_cookie: process.env.SOCIO_SESSION_COOKIE,
    db: process.env.SOCIO_DATABASE,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIO_GOOGLE_USER,
            pass: process.env.SOCIO_GOOGLE_PASS
        }
    },
    google_clientID: process.env.SOCIO_GOOGLE_CLIENTID,
    google_clientSecret: process.env.SOCIO_GOOGLE_CLIENTSECRET,
    google_callbackURL: process.env.SOCIO_GOOGLE_CALLBACK,
    jwt_secret: process.env.SOCIO_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports=eval(process.env.NODE_ENV) == undefined ? development:eval(process.env.NODE_ENV);