require('dotenv/config');

const config = {
    APP_PORT: process.env.APP_PORT,
    DB_CONNECTION: process.env.DB_CONNECTION,
}

module.exports = config;
