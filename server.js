const express = require('express');
const config = require("./config");
const cors = require("cors");

const appQuilt = express();
appQuilt.use(cors());

const objImport = require("./routes");
const mainRouter = objImport.mainRouter;
const imageRouter = objImport.imageRouter;

//Main entry point
//appQuilt.use(express.json(({ limit: '20mb' })));
//appQuilt.use(express.json());
appQuilt.use("/api", mainRouter);
appQuilt.use("/upload", imageRouter);

//Generic Error handler
appQuilt.use((objError, objRequest, objResponse, objNext) => {
  console.error(objError);
  objResponse.json({ name: objError.name, msg: objError.message });
});

if (config.port > 0) {
  const http = require('http');
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
    console.log(`Server listening on port ${config.portSSL}...`)});
}