const express=require('express')
const router=express.Router()

const {checkAdmin, checkVet}=require('../middleware/authmiddleware')

const { registerUser,
    loginUser,
    verifyEmail,
    getAllUsers, 
    getOwnProfile,
    getAllOwners,
    getOneUser, 
    updateUser, 
    updateOwner,
    updateOwnUser,
    deleteUser,
    deleteOwner,
    deleteOwnUser, 
    getByEmail,
}=require('../controllers/userController')

router.post('/signup', registerUser)
router.post('/loginUser',loginUser)

router.get('/:id/verify/:token', verifyEmail)

router.get('/',checkAdmin,getAllUsers)
router.get('/email/:email',getByEmail)
router.get('/owner',checkVet, getAllOwners)
router.get('/profile/:id', getOwnProfile)
router.get('/:userId', getOneUser)
router.put('/:userId', checkAdmin, updateUser)
router.put('/owner/:userId', checkVet, updateOwner)
router.put('/me/profile', updateOwnUser)
router.delete('/:userId',checkAdmin, deleteUser)
router.delete('/owner/:userId',checkVet, deleteOwner)
router.delete('/me/profile', deleteOwnUser)


module.exports = router
