const express = require("express");
const config = require("./config");
const mainRouter = require("./routes");
const cors = require("cors");

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

//App start successful
appQuilt.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}...`);
});
