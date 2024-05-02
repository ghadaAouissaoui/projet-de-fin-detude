const router = require('express').Router()

const { checkAdmin , checkVet,protect} = require("../middleware/authmiddleware");

const {
    getAllAppointments,
    getOneAppointment,
    getVetAppointments,
    getPetAppointments,
    getAvailableAppointments,
    createAppointment,
    bookAppointment,
    updateAppointment,
    deleteAppointment } = require('../controllers/appointmentController')

    router.get('/', getAllAppointments)
    router.get('/:appointmentId', checkVet,getOneAppointment)
    router.get('/vet/:vetId', getVetAppointments)
    router.get ('/owner/appointments', getPetAppointments)
    router.get('/owner/available',getAvailableAppointments)

    router.post('/:vetId',createAppointment)

    router.put('/:appointmentId',checkVet, updateAppointment)  
    router.put('/book/:appointmentId', bookAppointment)

    router.delete('/:appointmentId',checkVet, deleteAppointment)
   
  

  
  
 

module.exports = router