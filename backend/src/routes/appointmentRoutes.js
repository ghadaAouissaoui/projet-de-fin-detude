const router = require('express').Router()

const { checkAdmin , checkVet,protect} = require("../middleware/authmiddleware");

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
    updateAppointment,
    deleteAppointment } = require('../controllers/appointmentController')

    router.get('/', getAllAppointments)
    router.get('/:appointmentId', checkVet,getOneAppointment)
    router.get('/vet/:vetId', getVetAppointments)
    router.get ('/owner/appointments', getPetAppointments)
    router.get('/owner/available',getAvailableAppointments)
    router.get('/unavailable/:vetId',getUnavailableAppointments)


    router.post('/:vetId',checkVet('veterinaire') ,createAppointment)
    router.post('/first/:vetId' ,scheduleAppointment)
    
    router.put('/:appointmentId',checkVet, updateAppointment)  
    router.put('/book/:appointmentId', bookAppointment)

    router.delete('/:appointmentId',checkVet('veterinaire'), deleteAppointment)
   
  

  
  
 

module.exports = router