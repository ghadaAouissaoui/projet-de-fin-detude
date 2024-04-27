const router = require('express').Router()
const { checkAdmin, checkVet } = require("../middleware/authmiddleware");

const {
    getAllPets,
    getOnePet,
    getOwnerPet,
    createPetProfile,
    createPetPersonnel,
    updatePet,
    addPetToUser,
    deletePet } = require('../controllers/petsController')

router.get('/me', getOwnerPet)
router.get('/', getAllPets)
router.get('/:petId', checkVet, getOnePet)


router.post('/profile', createPetProfile)
router.post('/:userId',checkVet, createPetPersonnel)

router.put('/:petId', checkVet, updatePet)
router.put('/:petId/:userId', checkVet, addPetToUser)

router.delete('/:petId', checkVet, deletePet)

module.exports = router
