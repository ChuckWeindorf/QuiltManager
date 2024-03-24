const express = require("express");
const API = require('../controllers/apiAuthenticate');
const objImport = require("../controllers/favorites.controller");
const getAll = objImport.getAll;
const getOne = objImport.getOne;
const insertOne = objImport.insertOne;
const updateOne = objImport.updateOne;
const deleteOne = objImport.deleteOne;

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
