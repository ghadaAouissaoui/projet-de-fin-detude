const express = require('express');
const router = express.Router();

const { checkAdmin, checkVet,protect } = require("../middleware/authmiddleware");

const {
    getAllPets,
    getOnePet,
    getOwnerPet,
    createPetProfile,
    createPetPersonnel,
    updatePet,
  
    addPetToUser,
    deletePet } = require('../controllers/petsController')

router.get('/owner', getOwnerPet)

router.get('/:petId', checkVet, getOnePet)


router.post('/:id', createPetProfile)
router.post('/',protect,checkVet('veterinaire'), createPetPersonnel)

router.put('/:petId', checkVet, updatePet)
router.put('/:petId/:userId', checkVet, addPetToUser)

router.delete('/:petId', checkVet, deletePet)

module.exports = router;
