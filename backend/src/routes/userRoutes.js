const express=require('express')
const router=express.Router()


const { registerUser,loginUser,verifyEmail}=require('../controllers/userController')

router.post('/', registerUser)
router.post('/login',loginUser)
router.get('/:id/verify/:token',verifyEmail)

module.exports = router
