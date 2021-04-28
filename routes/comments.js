const express=require('express');
const router=express.Router();
const passport=require('passport');


const commentController=require('../controllers/comment_controller');

router.post('/add-comment',passport.checkAuthentication,commentController.add_comment);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);
module.exports=router;