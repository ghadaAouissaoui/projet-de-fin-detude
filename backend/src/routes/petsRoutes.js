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

router.post('/owner', getOwnerPet)
router.get('/', getAllPets)
router.get('/:petId', checkVet('veterinaire'), getOnePet)


router.post('/:userId', createPetProfile)
router.post('/',protect,checkVet('veterinaire'), createPetPersonnel)

router.put('/:petId', checkVet, updatePet)
router.put('/:petId/:userId', checkVet, addPetToUser)

router.delete('/:petId', checkVet, deletePet)

module.exports = router;
