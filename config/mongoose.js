const mongoose=require('mongoose');
require('dotenv').config();
console.log(process.env.SOCIO_DATABASE);

function connectDb(){
    mongoose.connect(process.env.SOCIO_DATABASE);
    const connection=mongoose.connection;
    connection.once('open',(err)=>{
        if(err){
            console.log("Not connected to database!");
            return;
        }
        console.log('Database connected!');
    })
}
module.exports=connectDb;
