const express=require('express');
const router=express.Router();
const passport=require('passport');


const postController=require('../controllers/post-controller');

router.post('/new-post',postController.new_post);

module.exports=router;