const express=require('express');
const port=8080;
const app=express();

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