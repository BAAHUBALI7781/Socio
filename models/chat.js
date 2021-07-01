const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    username:{
        type:'String',
        required:true
    },
    message:{
        type:'String',
        required:true
    },
    user_email:{
        type:'String',
        required:true
    },
    date:{
        type:'String',
        required:true
    },
    time:{
        type:'String',
        required:true
    }
},{
    timestamps:true
});

const ML=mongoose.model('ML',chatSchema);
const WebD=mongoose.model('WebD',chatSchema);
const CP=mongoose.model('CP',chatSchema);
const IP=mongoose.model('IP',chatSchema);

module.exports={
    ML,WebD,CP,IP
};