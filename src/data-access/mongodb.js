const mongoose = require('mongoose');
const configEnv = require('../config');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(configEnv.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true}
);

// Signal connection
mongoose.connection.once('open', function () {
    console.log('Mongo Connection has been made');
}).on('error', function (error) {
    console.log('Mongo Connect error', error);
}).on('disconnected', function () {
    console.log('Mongo Connection disconnected');
})

module.exports = mongoose