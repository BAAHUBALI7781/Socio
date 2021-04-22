const express=require('express');
const cookieParser=require('cookie-parser');
const port=8080;
const app=express();
app.use(express.urlencoded());


const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.static('./assets'));
//use express router
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');
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