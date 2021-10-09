const Appointment = require('../../data-access/models/appointments');
const serviceFunction = require('../../services/service-function');

const getAppointment = async(req, res) => {

    console.log("getAppointment called..")

    let responseClient = {
        message: ''
    }

    let reqParamId = req.params.doctorId;

    // console.log("reqParamId: ",reqParamId);

    try {

        let optionPaginate = serviceFunction.checkParamsPaginateQuery(req.query) ;
        // console.log('queryPaginate: ',optionPaginate);

        let query = {};
        if ( reqParamId ) {
            query = {'doctor_id': reqParamId} 
        }

        let option = !serviceFunction.isEmpty(optionPaginate) ? optionPaginate : undefined
        // console.log('query,option : ',query,option);
   
        const findAppointmentData = await Appointment.find( query, null , option);
        console.log('findAppointmentData: ',findAppointmentData);
        if ( !findAppointmentData || findAppointmentData.length === 0 ) {
            responseClient.message = 'Fail';
            responseClient.error = 'data not found';
            return res.status(404).send(responseClient);
        }
        responseClient.message = 'Success';
        responseClient.data = findAppointmentData;

        return res.send(responseClient);
     
    } catch (error) {
        responseClient.message = 'Fail';
        responseClient.error = error.message;
        return res.status(500).send(responseClient);
    }
}

module.exports = getAppointment;
