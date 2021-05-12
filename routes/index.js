
const express=require('express');
const router=express.Router();
const passport=require('passport');

const homeController=require('../controllers/home_controller');
const userController=require('../controllers/user_controller');


router.get('/',homeController.home);

router.use('/user',require('./users'));
router.use('/like',require('./likes'));
router.use('/post',require('./posts'));
router.use('/comment',require('./comments'));
router.use('/api',require('./api'));


module.exports=router;