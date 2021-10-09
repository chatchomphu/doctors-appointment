// const httpRequest = require('../utils/http-request')
// const configEnv = require('../config');

module.exports.isEmpty = (obj) => {

    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }

    return true;
}

module.exports.checkParamsPaginateQuery = function(reqParams) {
    let listParams = {};
    let selectObj = {};
    if ( reqParams.select ){
        const selectArr = reqParams.select .split(",")
        selectArr.forEach((field) => {
            selectObj[field] = 1
         })
    }
    reqParams.select ? listParams.select = selectObj : undefined;
    reqParams.limit || reqParams.limit == 0 ? listParams.limit = Number(reqParams.limit) : undefined;
    reqParams.skip || reqParams.skip == 0 ? listParams.skip = Number(reqParams.skip) : undefined;
    reqParams.sort || reqParams.sort == 0 ? listParams.sort = reqParams.sort : undefined;

    console.log('listParams paginate: ', listParams)
    return listParams
  
}

module.exports.splitTimeSearch = function(reqParams) {
    let timeSearch = {};
    if ( reqParams.time ){
        const timeArr = reqParams.time.split(",")
        let timeFrom, timeTo
        timeArr.forEach((field) => {
            let i = field.indexOf(':');
            let fieldArr = [field.slice(0,i), field.slice(i+1)];

            if ( fieldArr[0] == 'from' ) {
                timeFrom = Date.parse(fieldArr[1])
            } else if ( fieldArr[0] == 'to' ) {
                timeTo = Date.parse(fieldArr[1])
            }
         })
         timeSearch.from = timeFrom
         timeSearch.to = timeTo
    }
    return timeSearch
  
}
