const express = require('express');
const app = express();
const routes = require('./src/controller/route')
const bodyParser = require('body-parser');
const initDoctors = require('./init/doctors')
const initPatients = require('./init/patients')


const configEnv = require('./src/config');
const appPort = configEnv.APP_PORT
 
app.use(bodyParser.json());
app.use(routes);

app.listen(appPort, async function()  {
    await initDoctors()
    await initPatients()
    console.log(`Server started on port ${appPort}`);
    })
