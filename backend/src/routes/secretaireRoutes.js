const express = require('express');
const router = express.Router();
const { getAllSecretaries, createSecretary, updateSecretary, deleteSecretary } = require('../controllers/secretaireController');
const { protect, checkUserRole } = require('../middleware/authmiddleware');

// Route pour récupérer tous les secrétaires
router.get('/', protect, checkUserRole('veterinaire'), getAllSecretaries);

// Route pour créer un secrétaire
router.post('/create', protect, checkUserRole('veterinaire'), createSecretary);

// Route pour mettre à jour un secrétaire
router.put('/:id', protect, checkUserRole('veterinaire'), updateSecretary);

// Route pour supprimer un secrétaire
router.delete('/:id', protect, checkUserRole('veterinaire'), deleteSecretary);

module.exports = router;
