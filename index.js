const express=require('express');
const cookieParser=require('cookie-parser');
const port=8080;
const app=express();

// To create layouts
const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');

//Create a session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore=require('connect-mongo');

// SASS
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

// Get the req body as an object
app.use(express.urlencoded());


app.use(cookieParser());

// Use the assets 
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Set view engine and views
app.set('view engine','ejs');
app.set('views','./views');

// Use the session cookie
app.use(session({
    name:'codeial',
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/codeial_development',
        autoRemove:'disabled',
    },function(err){
        console.log(err || 'connect-mongdb setup');
    })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

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