const mongoose=require('mongoose');
const env=require('../config/environment');
console.log(env.db);
mongoose.connect(env.db || `mongodb://localhost/${env.db}`);

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

db.once('open',function(){
    console.log('Connected to database');
});

module.exports=mongoose;
