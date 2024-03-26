const config = require("./config");
const mainRouter = require("./routes");
const cors = require("cors");

const http = require('http');

const express = require('express');
const appQuilt = express();

//Main entry point
appQuilt.use(cors());
appQuilt.use(express.json());
appQuilt.use("/api", mainRouter);

//Generic Error handler
appQuilt.use((objError, objRequest, objResponse, objNext) => {
  console.error(objError);
  objResponse.json({ name: objError.name, msg: objError.message });
});

if (config.port > 0) {
const httpServer = http.createServer(appQuilt);
httpServer.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}...`)});
}
if (config.portSSL > 0) {
  const fs = require('fs');
  const https = require('https');
  const privateKey  = fs.readFileSync('/etc/ssl/private/_.debbie-quilting.com_private_key.key', 'utf8');
  const certificate = fs.readFileSync('/etc/ssl/certs/debbie-quilting.com_ssl_certificate.cer', 'utf8');
  const credentials = {key: privateKey, cert: certificate};
  const httpsServer = https.createServer(credentials, appQuilt);
  httpsServer.listen(config.portSSL, () => {
    console.log(`SServer listening on port ${config.portSSL}...`)});
}