const FreeSlot = require('../../data-access/models/free-slot');
const serviceFunction = require('../../services/service-function');

const getFreeSlot = async(req, res) => {

    console.log("getFreeSlot called..")

    let responseClient = {
        message: ''
    }

    let reqParamId = req.params.doctorId;

    // console.log("reqParamId: ",reqParamId);

    try {

        let optionPaginate = serviceFunction.checkParamsPaginateQuery(req.query) ;
        // console.log('queryPaginate: ',optionPaginate);

        let timeSearch = serviceFunction.splitTimeSearch(req.query) ;
        console.log("timeSearch: ",timeSearch);

        let query = {};
        if ( reqParamId ) {
            query = {'doctor_id': reqParamId} 
        }
        if ( timeSearch.from && timeSearch.to ) {
            query["date"] = {
                $gte: timeSearch.from,
                $lt: timeSearch.to
            }
        }

        let option = !serviceFunction.isEmpty(optionPaginate) ? optionPaginate : undefined
        // console.log('query,option : ',query,option);
   
        const findFreeSlotData = await FreeSlot.find( query, null, option ).sort({"date":1});
        console.log('findFreeSlotData: ',findFreeSlotData);
        if ( !findFreeSlotData || findFreeSlotData.length === 0 ) {
            responseClient.message = 'Fail';
            responseClient.error = 'data not found';
            return res.status(404).send(responseClient);
        }
        responseClient.message = 'Success';
        responseClient.data = findFreeSlotData;

        return res.send(responseClient);
     
    } catch (error) {
        responseClient.message = 'Fail';
        responseClient.error = error.message;
        return res.status(500).send(responseClient);
    }
}

module.exports = getFreeSlot;
