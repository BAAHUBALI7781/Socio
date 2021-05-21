const mongoose=require('mongoose');

const friendSchema=new mongoose.Schema({
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});

const Friendship=mongoose.model('Friendship',friendSchema);
module.exports=Friendship;