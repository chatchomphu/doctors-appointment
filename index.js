const express = require('express');
const app = express();
const routes = require('./src/controller/route')
const bodyParser = require('body-parser');

const configEnv = require('./src/config');
const appPort = configEnv.APP_PORT
 
app.use(bodyParser.json());
app.use(routes);

app.listen(appPort, async function()  {
    console.log(`Server started on port ${appPort}`);
    })
