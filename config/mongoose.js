const mongoose=require('mongoose');
const env=require('./environment');
mongoose.connect(process.env.SOCIO_DATABASE ||'mongodb://localhost/socio-development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to database');
});

module.exports=mongoose;
