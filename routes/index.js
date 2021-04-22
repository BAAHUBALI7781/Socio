
const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');
const authController=require('../controllers/auth_controller');

router.get('/',homeController.home);
router.use('/user',require('./users'));

router.get('/sign-up-page',authController.signUpPage);
router.get('/sign-in-page',authController.signInPage);

console.log('Okayyy');
router.post('/sign-up',authController.sign_up) ;

module.exports=router;