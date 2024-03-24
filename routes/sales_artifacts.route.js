const express = require("express");
const API = require('../controllers/apiAuthenticate');
const objImport = require("../controllers/sales_artifacts.controller");
const getAll = objImport.getAll;
const getOne = objImport.getOne;
const insertOne = objImport.insertOne;
const updateOne = objImport.updateOne;
const deleteOne = objImport.deleteOne;
const getOneWorkOrder = objImport.getOneWorkOrder;

const sales_artifactsRouter = express.Router();

/**
 * Get actions for sales_artifacts database sent to sales_artifacts controller
 */
sales_artifactsRouter.get(
  "/workorder/:cintID",
  async (objRequest, objResponse, next) => {
    try {
      //console.log("I AM IN TEH RIGHT PLACE");
      if (API.authenticateKey(objRequest))
      {
       let { cintID } = objRequest.params;
      let sale_artifactData;
      sale_artifactData = await getOneWorkOrder(cintID);
      objResponse.json(sale_artifactData);
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
  }
);

/**
 * Get actions for sales_artifacts database sent to sales_artifacts controller
 */
sales_artifactsRouter.get(
  "/:cintID?",
  async (objRequest, objResponse, next) => {
    try {
      //console.log("NOT THE RIGHT GET!!!!!");
      if (API.authenticateKey(objRequest))
      {
       let { cintID } = objRequest.params;
      let sale_artifactData;
      if (cintID) {
        sale_artifactData = await getOne(cintID);
      } else {
        sale_artifactData = await getAll();
      }

      objResponse.json(sale_artifactData);
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
  }
);

/**
 * Post actions for sales_artifacts database sent to sales_artifacts controller
 */
sales_artifactsRouter.post("/", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
    {
   let sale_artifactBody = objRequest.body;
    let sale_artifactData = await insertOne(sale_artifactBody);
    objResponse.json(sale_artifactData);
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
 * Put actions for sales_artifacts database sent to sales_artifacts controller
 */
sales_artifactsRouter.put("/:cintID", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
    {
   let { cintID } = objRequest.params;
    let sale_artifactBody = objRequest.body;
    let sale_artifactData = await updateOne(cintID, sale_artifactBody);
    objResponse.json(sale_artifactData);
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
 * Delete actions for sales_artifacts database sent to sales_artifacts controller
 */
sales_artifactsRouter.delete(
  "/:cintID",
  async (objRequest, objResponse, next) => {
    try {
      if (API.authenticateKey(objRequest))
      {
       let { cintID } = objRequest.params;
      let sale_artifactData = await deleteOne(cintID);
      objResponse.json(sale_artifactData);
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
  }
);

module.exports = sales_artifactsRouter;
