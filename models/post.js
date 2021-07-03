const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const POST_PATH=path.join('/uploads/posts/images');

const postScehma = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    avatar:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the array of ids of all comments in the post schema itself
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'    
    }],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
    heart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],
    laugh:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],


},{
    timestamps:true
});

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',POST_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});

postScehma.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
postScehma.statics.postPath=POST_PATH;

const Post=mongoose.model('Post',postScehma);
module.exports=Post;