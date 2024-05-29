const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect ,checkVet} = require('../middleware/authmiddleware');
const { registerVeterinary, loginVeterinary, verifyEmail, getAllVet, deleteVet,updateVet, getVetProfile,getOneVet,getDateTime, getAllPetsOfVeterinary ,deleteExperience, uploadPhoto} = require('../controllers/veterinaryController');
const { getByEmail } = require('../controllers/userController');
const upload = require('../config/upload');

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

router.put('/:id', protect,updateVet)
router.delete('/:id',protect,deleteVet)

router.delete('/experience/:id', protect, deleteExperience);

router.put('/:id/photo',checkVet('veterinaire'),protect,upload.single('profilePhoto'),uploadPhoto)

// Route for getting veterinarian profile
router.get('/', getAllVet);

module.exports = router;
