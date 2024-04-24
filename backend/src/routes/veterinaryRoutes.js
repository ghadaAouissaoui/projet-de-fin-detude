const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authmiddleware');
const { registerVeterinary, loginVeterinary, getVeto, verifyEmail, getVeterinarianById } = require('../controllers/veterinaryController');

// Routes for registering and logging in a veterinarian
router.post('/signuppro', registerVeterinary);
router.post('/loginVeto', loginVeterinary);

// Route for verifying email with dynamic user type
router.get('/:id/verify/:token', verifyEmail);

// Define a route to get veterinarian profile by ID
router.get('/:id', getVeterinarianById);

// Route for getting veterinarian profile
router.get('/me', getVeto);

module.exports = router;
