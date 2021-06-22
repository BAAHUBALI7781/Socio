const express=require('express');
const cookieParser=require('cookie-parser');
const env=require('./config/environment');
const logger=require('morgan');
const port=8080;
const app=express();
require('./config/view-helpers')(app);
// To create layouts
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
//Create a session cookie
const session=require('express-session');

// including passport
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const passportJWT=require('./config/passport-jwt');
const passportGoogle=require('./config/passport-google-oauth2');
const MongoStore=require('connect-mongo');
// SASS
const sassMiddleware=require('node-sass-middleware');
// Noty messages middleware
const flash=require('connect-flash');
const customFlash=require('./config/middleware');

// Socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_socket').chatSocket(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port 5000");

const path=require('path');
// Setting up SCSS

if(env.name=='development'){
    app.use(sassMiddleware({
        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
}

// Get the req body as an object
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());

// Using morgan
app.use(logger(env.morgan.mode,env.morgan.options));

// Use the assets 
app.use(express.static(env.asset_path));
// Make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Set view engine and views
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'socio',
    secret:env.session_cookie,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        
        mongoUrl: `mongodb://localhost/${env.db}`,
        autoRemove:'disabled',
    },function(err){
        console.log(err || 'connect-mongdb setup');
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customFlash.setFlash);

//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error: ${err}`);
        return;
    }
    else{
        console.log(`Server Establised at ${port}`);
    }
})