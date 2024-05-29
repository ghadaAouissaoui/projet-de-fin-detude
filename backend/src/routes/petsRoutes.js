const express = require('express');
const router = express.Router();

const { checkAdmin, checkVet,protect ,authMiddleware} = require("../middleware/authmiddleware");

const {
    getAllPets,
    getOnePet,
    getOwnerPet,
    createPetProfile,
    createPetPersonnel,
    updatePet,
    addPetToUser,
    deletePet, 
    historical} = require('../controllers/petsController')

router.post('/owner', getOwnerPet)
router.get('/', getAllPets)
router.get('/:petId', checkVet('veterinaire'), getOnePet)
router.get('/historical/:petId',protect, historical)

router.post('/:userId', createPetProfile)
router.post('/',protect,checkVet('veterinaire'), createPetPersonnel)

router.put('/:petId', updatePet)
//router.put('/:petId/:userId', checkVet, addPetToUser)

router.delete('/:petId', deletePet)

module.exports = router;
