const express=require('express');
const homeController=require('../controllers/home_controller');
const router=express.Router();
// console.log('Loaded');
router.get('/practise',homeController.practise);
module.exports=router;