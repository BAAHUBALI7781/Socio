const express=require('express');
const router=express.Router();

const chatController=require('../controllers/chat_controller');
router.get('/:room',chatController.chat);
router.get('/delete/:id',chatController.destroy);
module.exports=router;