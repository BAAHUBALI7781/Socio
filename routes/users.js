const express=require('express');
const { use } = require('.');
const router=express.Router();
const userController=require('../controllers/user_controller');
router.get('/profile',userController.profile);
router.get('/',userController.home);

router.get('/sign-up-page',userController.signUpPage);
router.get('/sign-in-page',userController.signInPage);

router.post('/sign-up',userController.sign_up) ;
router.post('/sign-in',userController.sign_in);

module.exports=router;





