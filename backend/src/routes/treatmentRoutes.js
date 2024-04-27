const express= require('express')
const router=express.Router()

const {checkAdmin}=require('../middleware/authmiddleware')
const { getAllTreatments,
    getOneTreatment, 
    createTreatment, 
    updateTreatment, 
    deleteTreatment 
   } = require('../controllers/treatmentController')  


router.get('/', getAllTreatments)
router.get('/:treatmentId', getOneTreatment)
router.post('/',checkAdmin, createTreatment)
router.put('/:treatmentId',checkAdmin, updateTreatment)
router.delete('/:treatmentId',checkAdmin, deleteTreatment)

module.exports = router