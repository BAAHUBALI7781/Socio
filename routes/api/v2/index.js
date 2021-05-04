const express=require('express');
const router=express.Router();

router.use('/posts',require('./posts_v2'));
module.exports=router;