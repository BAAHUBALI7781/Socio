const express=require('express');
const passport=require('passport');
const router=express.Router();
const userController=require('../controllers/user_controller');
const resetController=require('../controllers/reset_password_controller');

router.get('/profile/:id',userController.profile);
router.post('/update-profile/:id',passport.checkAuthentication,userController.update_profile);
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

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'user/sign-in-page'}),userController.sign_in);

// Reset Password
router.get('/forget-password',userController.forget_email_page);
router.post('/reset',resetController.send_mail);
router.get('/reset_password_page/:id',resetController.reset_password_page);
router.post('/confirm-change/:id',resetController.changePassword);

module.exports=router;





