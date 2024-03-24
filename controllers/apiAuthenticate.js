const config = require("../config");

function authenticateKey(objRequest) 
  {
  let req_api_key = objRequest.header("qm-api-key");
  //console.log(req_api_key, config.qmAPIkey);
  if (req_api_key == config.qmAPIkey) {
    return true;
  } else {
    return false;
  }
};

module.exports = { authenticateKey };
