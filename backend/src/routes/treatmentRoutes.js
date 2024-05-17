const express= require('express')
const router=express.Router()

const { authMiddleware, checkVet}=require('../middleware/authmiddleware')
const { getAllTreatments,
    getOneTreatment, 
    createTreatment, 
    updateTreatment, 
    deleteTreatment 
   } = require('../controllers/treatmentController')  


router.get('/', getAllTreatments)
router.get('/:treatmentId', getOneTreatment)
router.post('/',authMiddleware,checkVet('veterinaire'), createTreatment)
router.put('/:treatmentId',authMiddleware,checkVet('veterinaire'), updateTreatment)
router.delete('/:treatmentId',authMiddleware,checkVet('veterinaire'), deleteTreatment)

module.exports = router 