const express = require('express');
const router = express.Router();

const { protect ,checkVet} = require('../middleware/authmiddleware');
const { registerVeterinary, loginVeterinary, verifyEmail, getAllVet, deleteVet,updateVet, getVetProfile,getOneVet,getDateTime, getAllPetsOfVeterinary } = require('../controllers/veterinaryController');
const { getByEmail } = require('../controllers/userController');

// Routes for registering and logging in a veterinarian
router.post('/signuppro', registerVeterinary);
router.post('/loginVeto', loginVeterinary);
router.post('/availabilty',getDateTime)
// Route for verifying email with dynamic user type
router.get('/:id/verify/:token', verifyEmail);

// Define a route to get veterinarian profile by ID
router.get('/:id', getOneVet);
router.get('/profile/:id',getVetProfile)
router.get('/:id/patients',getAllPetsOfVeterinary)
router.get('/email/:email',getByEmail)

router.put('/:id',checkVet, protect,updateVet)
router.delete('/:id',checkVet,protect,deleteVet)




// Route for getting veterinarian profile
router.get('/', getAllVet);

module.exports = router;
