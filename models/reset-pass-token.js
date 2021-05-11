const mongoose=require('mongoose');
const resetTokenSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String,
    },
    isValid:{
        type:Boolean,
    
    }
    
},{
    timestamps:true
});

const ResetToken=mongoose.model('ResetToken',resetTokenSchema);
module.exports=ResetToken;