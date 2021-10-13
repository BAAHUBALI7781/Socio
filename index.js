const express=require('express');
const cookieParser=require('cookie-parser');
const logger=require('morgan');
const port=process.env.PORT || 8080;
const app=express();

const path=require('path');

// To create layouts
const expressLayouts=require('express-ejs-layouts');
const connectDb=require('./config/mongoose');
connectDb();
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
chatServer.listen(port);
console.log("Chat server is listening on port 5000");

// Setting up SCSS

if(!process.env.SOCIO_ENVIRONMENT=='production'){
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


// Use the assets 
console.log(process.env.SOCIO_ASSET_PATH);
app.use(express.static(process.env.SOCIO_ASSET_PATH));
// Make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);


// Set view engine and views
app.set('view engine','ejs');
app.set('views','./views');


app.use(session({
    name:'socio',
    secret:process.env.SOCIO_SESSION_COOKIE,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        
        mongoUrl: process.env.SOCIO_DATABASE,
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