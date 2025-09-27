const express = require("express");
const API = require('../controllers/apiAuthenticate');
const objImport = require("../controllers/favorites.controller");
const getAll = objImport.getAll;
const getOne = objImport.getOne;
const insertOne = objImport.insertOne;
const updateOne = objImport.updateOne;
const deleteOne = objImport.deleteOne;
const config = require("../config");

const favoritesRouter = express.Router();

/**
 * Get actions for favorites database sent to favorites controller
 */
favoritesRouter.get("/:cintID?", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let { cintID } = objRequest.params;
    let favoriteData;
    if (cintID) {
      favoriteData = await getOne(cintID);
    } else {
      favoriteData = await getAll();
    }

    objResponse.json(favoriteData);
    //console.log(favoriteData);
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

/**
 * Post actions for favorites database sent to favorites controller
 */
favoritesRouter.post("/", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let favoriteBody = objRequest.body;
    let favoriteData = await insertOne(favoriteBody);
    objResponse.json(favoriteData);
    //
    SendConfirmingEmail(objRequest);
    //
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

function SendConfirmingEmail(objRequest)
{
  //console.log("Start NODEMAILER");
  var nodemailer = require('nodemailer');
  //console.log("Create Transport");
  var transport = nodemailer.createTransport({
    host: config.mailserver,
    port: config.mailport,
    secure: true,
    auth: {
      user: config.maillogin,
      pass: config.mailpassword
    }
  });
  //console.log("Create mail options");
  var mailOptions = {
    from: 'quiltmanager@debbie-quilting.com',
    to: 'debra.weindorf@gmail.com',
    //to: 'debbie@debbie-intarsia.com',
    //to: 'charles.weindorf2@mudsox.com',
    subject: 'You have a new favorite quilt pattern',
    text: `Customer ${objRequest.body.GuestName} selected ${objRequest.body.CatFileName}`, 
    attachments: [
      {   // utf-8 string as an attachment
          path: `${config.artifactPath}${objRequest.body.CatFileName}`
      }]
  };
  
  //console.log("TRY TO SENDMAIL");
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    //console.log('Message sent: ', info.messageId);
  });      
};

/**
 * Put actions for favorites database sent to favorites controller
 */
favoritesRouter.put("/:cintID", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let { cintID } = objRequest.params;
    let favoriteBody = objRequest.body;
    let favoriteData = await updateOne(cintID, favoriteBody);
    objResponse.json(favoriteData);
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

/**
 * Delete actions for favorites database sent to favorites controller
 */
favoritesRouter.delete("/:cintID", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let { cintID } = objRequest.params;
    let favoriteData = await deleteOne(cintID);
    objResponse.json(favoriteData);
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

module.exports = favoritesRouter;
