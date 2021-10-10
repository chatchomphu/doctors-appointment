const initDoctors = require('./doctors')
const initPatients = require('./patients')

const initData = async () => {
    await initDoctors()
    await initPatients()
}

initData()
setTimeout((function() {
    console.log("init data doctor and patient success")
    return process.exit(200);
}), 5000);
