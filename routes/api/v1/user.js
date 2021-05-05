const express=require('express');
const router=express.Router();

const user_api_controller=require('../../../controllers/api/v1/user_api');
router.post('/sign-in',user_api_controller.sign_in);

module.exports=router;