const express = require('express')
const router = express.Router()

const postAppointment = require('./appointment/post-appointment')
const getAppointment = require('./appointment/get-appointment')
const deleteAppointment = require('./appointment/delete-appointment')

const getFreeSlot = require('./doctors/get-free-slot')


router
.post('/doctors-appointment/v1/appointments', postAppointment)
.get('/doctors-appointment/v1/appointments/doctors/:doctorId', getAppointment)
.delete('/doctors-appointment/v1/appointments/patients/:patient_id', deleteAppointment)

.get('/doctors-appointment/v1/free-slots', getFreeSlot)
.get('/doctors-appointment/v1/free-slots/doctors/:doctorId', getFreeSlot)

module.exports = router
