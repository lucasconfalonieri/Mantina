const dotenv = require('dotenv').config();

const config = {
    appConfig: {
        host: process.env.HOST || '127.0.0.1',
        port: process.env.PORT || 3000
    }
}

module.exports = config;