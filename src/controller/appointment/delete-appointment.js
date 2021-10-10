const Appointment = require('../../data-access/models/appointments');
const FreeSlot = require('../../data-access/models/free-slot');

const deleteAppointment = async(req, res) => {

    console.log("deleteAppointment called..");

    let responseClient = {
        message: ''
    }

    try {
        let query = { 'patient_id': req.params.patient_id }

        const findAppointmentData = await Appointment.findOne( query, null );
        console.log('findData: ',findAppointmentData);
        if ( !findAppointmentData || findAppointmentData.length === 0 ) {
            responseClient.message = 'Fail';
            responseClient.error = 'data not found';
            return res.status(404).send(responseClient);
        }
    
        // stamp status slot was reserved
        const updateData = await FreeSlot.updateOne({ '_id': findAppointmentData.slot_id }, { $set: JSON.parse(JSON.stringify({ is_reserved : false })) });
        if ( updateData && updateData.nModified <= 0){
            responseClient.message = 'Fail';
            responseClient.error = 'database nothing update';
            return res.status(500).send(responseClient);
        }

        const deleteData = await Appointment.deleteOne(query);
        if ( deleteData && deleteData.deletedCount == 0){
            responseClient.message = 'Fail';
            responseClient.error = 'data not found';
            return res.status(404).send(responseClient);
        }

        responseClient.message = 'Success';
        responseClient.data = query;

        return res.status(200).send(responseClient);
    } catch (error) {
        responseClient.message = 'Fail';
        responseClient.error = error.message;
        return res.status(500).send(responseClient);
    }
}

module.exports = deleteAppointment;
