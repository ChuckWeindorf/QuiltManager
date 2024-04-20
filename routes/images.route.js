const express = require("express");
const fs = require("fs");
const config = require("../config");
const API = require('../controllers/apiAuthenticate');

const imagesRouter = express.Router();

/**
 * save a file to a variable folder on the artifacts area of local disk
 * the body must contain a category key in FormData within the req
 */
imagesRouter.post("/", (objRequest, objResponse, next) => {
  try {
    //console.log("START the POST /upload");
    if (API.authenticateKey(objRequest))
    {  
    //console.log(objRequest.headers);
    //console.log(objRequest.body);
    //console.log(objRequest.body.category, objRequest.files.file.name);
    //console.log(objRequest.body," AND FILES ", objRequest.files.file);
    //console.log("About to set path");
    const savePath = require("path").join(
      `${config.artifactPath}${objRequest.body.category}/${objRequest.files.file.name}`
    );
    //console.log(savePath);
    fs.writeFile(savePath, objRequest.files.file.data, "base64", (err) => {
      if (err) {
        return console.log(err);
      }
      objResponse
      .status(200)
      .send({ success: { code: 200, message: "Image save complete" } });
    });
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

module.exports = imagesRouter;