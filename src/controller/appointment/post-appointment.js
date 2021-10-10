const Appointment = require('../../data-access/models/appointments');
const Patient = require('../../data-access/models/patients');
const FreeSlot = require('../../data-access/models/free-slot');

const { Validate } = require('../../validator/validate');
const bodySchema = require('../../models/appointments/post-appointments-schema');


const postAppointment = async(req, res) => {

    console.log("postAppointment called..");

    let responseClient = {
        message: ''
    }
    let reqBody = req.body;
    console.log("reqBody: ",reqBody);

    let invalid = Validate.body(reqBody,bodySchema);

    if( invalid ){
        console.log('request invalid: ', JSON.stringify(invalid[0]))
        responseClient.message = 'Fail';
        responseClient.error = 'invalid input';
        return res.status(400).send(responseClient);
    }

    try {

        let query = {'mobile_no': reqBody.mobile_no_patient,'pin_code': reqBody.pin_code} 
        
        const findData = await Patient.find( query, null );
        console.log('findData: ',findData);
        if ( !findData || findData.length === 0 ) {
            responseClient.message = 'Fail';
            responseClient.error = 'data not found';
            return res.status(404).send(responseClient);
        }

        const appointmentData = Appointment({
            doctor_id: reqBody.doctor_id,
            patient_id: findData[0]["patient_id"],
            date: new Date(reqBody.date),
            start_time: reqBody.start_time,
            end_time: reqBody.end_time,
            slot_id: reqBody.slot_id
        });

        console.log("appointmentData: ", appointmentData);
        const saveData = await appointmentData.save();
        if ( saveData ){
            responseClient.message = 'Success';
            responseClient.data = saveData;
        }

        // stamp status slot was reserved
        const updateData = await FreeSlot.updateOne({ '_id': reqBody.slot_id }, { $set: JSON.parse(JSON.stringify({ is_reserved : true })) });
        if ( updateData && updateData.nModified <= 0){
            responseClient.message = 'Fail';
            responseClient.error = 'database nothing update';
            return res.status(500).send(responseClient);
        }

        return res.status(200).send(responseClient);
    } catch (error) {
        responseClient.message = 'Fail';
        responseClient.error = error.message;
        if ( error.message.includes('E11000 duplicate') ) {
            responseClient.error = 'data is existing';
        } 
        return res.status(500).send(responseClient);
    }
}

module.exports = postAppointment;