// const express=require('express');
// const homeController=require('../controllers/home_controller');
// const router=express.Router();

// router.get('/practise',homeController.practise);
// router.use('/user',require('./users'));
// module.exports=router;





const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
router.get('/',homeController.home);
router.use('/user',require('./users'));
module.exports=router;

