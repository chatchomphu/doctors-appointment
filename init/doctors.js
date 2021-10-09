const Doctors = require('../src/data-access/models/doctors')
const FreeSlotSchema = require('../src/data-access/models/free-slot')

const utils = require('../src/utils/util-function')


const initDoctors = async () => {

    let doctorId1 = "001"
    let periodSlotDoctor1 = 1
    let appointmentDateDoctor1 = [
        {
            day: 'Monday',
            start_time: "08:00",
            end_time: "12:00"
        },
        {
            day: 'Wednesday',
            start_time: "08:00",
            end_time: "12:00"
        },
        {
            day: 'Friday',
            start_time: "08:00",
            end_time: "12:00"
        }
    ]
    let freeSlotDoctor1 = []
    freeSlotDoctor1 = utils.calFreeSlot(appointmentDateDoctor1, periodSlotDoctor1, doctorId1)
    console.log("freeSlot doctor1: ", freeSlotDoctor1)
 
    let doctorId2 = "002"
    let periodSlotDoctor2 = 0.5
    let appointmentDateDoctor2 = [
        {
            day: 'Tuesday',
            start_time: "13:00",
            end_time: "15:00"
        },
        {
            day: 'Thursday',
            start_time: "13:00",
            end_time: "15:00"
        },
        {
            day: 'Saturday',
            start_time: "13:00",
            end_time: "15:00"
        }
    ]
    let freeSlotDoctor2 = []
    freeSlotDoctor2 = utils.calFreeSlot(appointmentDateDoctor2, periodSlotDoctor2, doctorId2)
    console.log("freeSlot doctor2: ", freeSlotDoctor2)
    await FreeSlotSchema.insertMany(freeSlotDoctor1)
    await FreeSlotSchema.insertMany(freeSlotDoctor2)
    // create data doctors
    const doctors = [
        {
            doctor_id: doctorId1,
            name: "ก",
            appointment_date: appointmentDateDoctor1,
            period_slot: periodSlotDoctor1,
        },
        {
            doctor_id: doctorId2,
            name: "ข",
            appointment_date: appointmentDateDoctor2,
            period_slot: periodSlotDoctor2,
        }
    ]
   await Doctors.insertMany(doctors)

}

module.exports = initDoctors;
