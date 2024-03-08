const express = require("express");
const fs = require("fs");
const config = require("../config");
const objImport = require("../controllers/artifacts.controller")
const getAll = objImport.getAll;
const getOne = objImport.getOne;
const getCats = objImport.getCats;
const getCatList = objImport.getCatList;
const insertOne = objImport.insertOne;
const updateOne = objImport.updateOne;
const deleteOne = objImport.deleteOne;

const artifactsRouter = express.Router();

/**
 * Get the categories from artifacts to allow user filter of images
 */
artifactsRouter.get("/categories", async (objRequest, objResponse, next) => {
  try {
    let artifactData = await getCats();
    objResponse.json(artifactData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Get the images in a category from artifacts
 */
artifactsRouter.get("/catlist/:cstrCat", async (objRequest, objResponse, next) => {
    try {
      let { cstrCat } = objRequest.params;
      let artifactData = await getCatList(cstrCat);
      //console.log(artifactData);
      objResponse.json(artifactData);
    } catch (objError) {
      next(objError);
    }
  }
);

/**
 * Get actions for artifacts database sent to artifacts controller
 */
artifactsRouter.get("/:cintID?", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let artifactData;
    if (cintID) {
      artifactData = await getOne(cintID);
    } else {
      artifactData = await getAll();
    }

    objResponse.json(artifactData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Post actions for artifacts database sent to artifacts controller
 */
artifactsRouter.post("/", async (objRequest, objResponse, next) => {
  try {
    let artifactBody = objRequest.body;
    let artifactData = await insertOne(artifactBody);
    objResponse.json(artifactData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Put actions for artifacts database sent to artifacts controller
 */
artifactsRouter.put("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let artifactBody = objRequest.body;
    let artifactData = await updateOne(cintID, artifactBody);
    objResponse.json(artifactData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Delete actions for artifacts database sent to artifacts controller
 */
artifactsRouter.delete("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let artifactData = await deleteOne(cintID);
    objResponse.json(artifactData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * save a file to a variable folder on the artifacts area of local disk
 * the body must contain a category key in FormData within the req
 */
artifactsRouter.post("/upload", (req, res, next) => {
  try {
    //console.log(req.body);
    //console.log(req.body," AND FILES ", req.files.file);
    const savePath = require("path").join(
      `${config.artifactPath}${req.body.category}/${req.files.file.name}`
    );
    //console.log(savePath);
    fs.writeFile(savePath, req.files.file.data, "base64", (err) => {
      if (err) {
        return console.log(err);
      }
    //  else console.log("A file was written!")
    });
  } catch (objError) {
    next(objError);
  }
});

module.exports = artifactsRouter;
