const Patients = require('../src/data-access/models/patients')

const initPatients = async () => {
    const patients = [
        {
            patient_id: 1,
            name: "นายกร",
            mobile_no: "0810000001",
            pin_code: "111111"
        },
        {
            patient_id: 2,
            name: "นายนก",
            mobile_no: "0810000002",
            pin_code: "222222"
        },
        {
            patient_id: 3,
            name: "นายตนู",
            mobile_no: "0810000003",
            pin_code: "333333"
        },
        {
            patient_id: 4,
            name: "นายหมาย",
            mobile_no: "0810000004",
            pin_code: "444444"
        }
    ]
    await Patients.insertMany(patients)
}
// 1. นายกร เบอรโ์ ทร 0810000001 รหสั pin code 111111
// 2. นายนก เบอรโ์ ทร 0810000002 รหสั pin code 222222
// 3. นายตนู เบอรโ์ ทร 0810000003 รหสั pin code 333333
// 4. นายหมาย เบอรโ์ ทร 0810000004 รหสั pin code 444444
module.exports = initPatients;
