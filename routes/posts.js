const express=require('express');
const router=express.Router();
const passport=require('passport');


const postController=require('../controllers/post-controller');

router.post('/new-post',passport.checkAuthentication,postController.new_post);
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports=router;