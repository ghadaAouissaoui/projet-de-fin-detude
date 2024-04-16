const express=require('express')
const router=express.Router()

const { protect} = require('../middleware/authmiddleware');

const { registerVeterinary,loginVeterinary,getVeto, verifyEmail}=require('../controllers/veterinaryController')

router.post('/signup', registerVeterinary)
router.post('/login',loginVeterinary)
router.get('/verify/:token',verifyEmail)
router.get('/me',protect,getVeto)


module.exports = router