const express=require('express');
const passport=require('passport');
const router=express.Router();
const userController=require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/',userController.home);

router.get('/sign-up-page',userController.signUpPage);
router.get('/sign-in-page',userController.signInPage);
router.get('/sign-out',userController.sign_out);

router.post('/sign-up',userController.sign_up);

// Use passport as a middleware to authenticate
router.post('/sign-in',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in-page'}
),userController.sign_in);


module.exports=router;





