require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET  = process.env.JWT_SECRET ;
const JWT_EXPIRES_TIME = process.env.JWT_EXPIRES_TIME;
const COOKIE_EXPIRES_TIME = process.env.COOKIE_EXPIRES_TIME;
const  BASE_URL = process.env. BASE_URL

module.exports = {
    MONGODB_URI,
    JWT_SECRET ,
    JWT_EXPIRES_TIME,
    COOKIE_EXPIRES_TIME,
    BASE_URL
}

