//import dotenv from "dotenv";
const dotenv = require("dotenv");

// ensures that env variables are loaded
const envFound = dotenv.config();

if (!envFound) {
  throw new Error("Couldn't find .env!");
}

/**
 * Read the contents of the .env file and place values into exported parameters
 */
module.exports = {
  mysql: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
  },
  port: parseInt(process.env.PORT),
  portSSL: parseInt(process.env.PORTSSL),
  etsyKey: process.env.ETSY_API_KEY,
  artifactPath: process.env.ARTIFACT_PATH,
  qmAPIkey: process.env.API_KEY,
  maillogin: process.env.MAIL_LOGIN,
  mailpassword: process.env.MAIL_PASSWORD,
  mailserver: process.env.MAIL_SERVER,
  mailport: parseInt(process.env.MAIL_PORT)
};
