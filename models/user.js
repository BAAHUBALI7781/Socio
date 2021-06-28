const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type:'String',
        required:true,
        unique:true
    },
    password:{
        type:'String',
        required:true
    },
    user_name:{
        type:'String',
        required:true
    },
    avatar:{
        type:'String'
    },
    portfolio:{
        type:'String'
    },
    linked:{
        type:'String'
    },
    github:{
        type:'String'
    },
    leetcode:{
        type:'String'
    },
    gfg:{
        type:'String'
    },
    codeforces:{
        type:'String'
    },
    codechef:{
        type:'String'
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
},{
    timestamps:true
});
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
});

// static methods
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User=mongoose.model('User',userSchema);

module.exports=User;



