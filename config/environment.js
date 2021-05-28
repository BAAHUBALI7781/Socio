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
    google_clientID:"45497913421-qgvtooat8lsblc9dpahl11crgnij1s8h.apps.googleusercontent.com",
    google_clientSecret:"97iz_nBJArWBnxvfSRRdY8tl",
    google_callbackURL:"http://localhost:8080/user/auth/google/callback",
    jwt_secret:'Socio'
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
    jwt_secret: process.env.SOCIO_JWT_SECRET
}

module.exports=eval(process.env.SOCIO_ENVIRONMENT)== undefined?development:eval(process.env.SOCIO_ENVIRONMENT);