const express=require('express');
const router=express.Router();

const posts_v2=require('../../../controllers/api/v2/posts_api');

router.use('/',posts_v2.posts);

module.exports=router;