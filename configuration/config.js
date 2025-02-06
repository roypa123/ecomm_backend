const dotenv = require('dotenv')
const path = require('path');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

const config = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    },
};

module.exports = config;