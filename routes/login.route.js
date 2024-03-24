const express = require("express");
const API = require('../controllers/apiAuthenticate');
const objImport = require("../controllers/login.controller");

const loginRouter = express.Router();
/**
 * Get actions for favorites database sent to favorites controller
 */
loginRouter.get("/", async (objRequest, objResponse, next) => {
    try {
        //decrypt login / password
        //console.log(objRequest.header("Authorization"));
        tmpRequest = atob(objRequest.header("Authorization") );
        //console.log(tmpRequest);

      if (API.authenticateKey(objRequest))
        {
      let login = tmpRequest.substring(0,tmpRequest.indexOf(":"));
      let password = tmpRequest.substring(tmpRequest.indexOf(":")+2);
      //console.log(login, password);
      let loginData = await objImport.checkLogin(login, password);
      objResponse.json(loginData);
      //console.log(loginData);
    }
    else
    {
    objResponse
       .status(403)
       .send({ error: { code: 403, message: "Invalid credentials." } });
    }
    } catch (objError) {
      next(objError);
    }
  });
module.exports = loginRouter;