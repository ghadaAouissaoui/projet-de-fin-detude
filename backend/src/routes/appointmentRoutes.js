const router = require('express').Router()

const { checkAdmin , checkVet,protect, authMiddleware} = require("../middleware/authmiddleware");

const {
    getAllAppointments,
    getOneAppointment,
    getVetAppointments,
    getPetAppointments,
    getAvailableAppointments,
    createAppointment,
    scheduleAppointment,
    bookAppointment,
    getUnavailableAppointments,
    getRecentAppointments,
    updateAppointment,
    deleteAppointment } = require('../controllers/appointmentController')

    router.get('/', getAllAppointments)
    router.get('/:appointmentId',getOneAppointment)
    router.get('/vet/:vetId', getVetAppointments)
    router.get ('/owner/appointments', getPetAppointments)
    router.get('/owner/available',getAvailableAppointments)
    router.get('/unavailable/:vetId',getUnavailableAppointments)
    router.get('/isTreated/:vetId',getRecentAppointments)

    router.post('/:vetId',authMiddleware,createAppointment)
    router.post('/first/:vetId' ,scheduleAppointment)
    
    router.put('/:appointmentId',protect, updateAppointment)  
    router.put('/book/:appointmentId', bookAppointment)

    router.delete('/:appointmentId',protect, deleteAppointment)
   

  
  
 

module.exports = router