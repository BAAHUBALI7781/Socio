const development={
    name:'development',
    asset_path:'./assets',
    session_cookie:'something',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'socio.510818090',
            pass: 'argo7781'
        }
    },
    google_clientID:"45497913421-qgvtooat8lsblc9dpahl11crgnij1s8h.apps.googleusercontent.com",
    google_clientSecret:"97iz_nBJArWBnxvfSRRdY8tl",
    google_callbackURL:"http://localhost:8080/user/auth/google/callback",
    jwt_secret:'Socio'
}
const production={
    name:'production'
}

module.exports=development;