const express = require('express');
const router = express.Router();
const { getAllSecretaries, createSecretary, updateSecretary, deleteSecretary, verifyEmail,loginSecretaire,getOneSec } = require('../controllers/secretaireController');

const { protect, checkVet } = require('../middleware/authmiddleware');

// Route pour récupérer tous les secrétaires
router.get('/', protect, checkVet('veterinaire'), getAllSecretaries);
router.get('/:secretaireId',getOneSec)
router.get('/:id/verify/:token', verifyEmail)

// Route pour créer un secrétaire
router.post('/create', protect, checkVet('veterinaire'), createSecretary);
router.post('/loginsec',loginSecretaire);
// Route pour mettre à jour un secrétaire
router.put('/:id', protect, checkVet('veterinaire'), updateSecretary);

// Route pour supprimer un secrétaire
router.delete('/:id', protect, checkVet('veterinaire'), deleteSecretary);



module.exports = router;
