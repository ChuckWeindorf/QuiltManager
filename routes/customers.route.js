const express = require("express");
const API = require('../controllers/apiAuthenticate');
const objImport = require("../controllers/customers.controller");
const getAll = objImport.getAll;
const getOne = objImport.getOne;
const insertOne = objImport.insertOne;
const updateOne = objImport.updateOne;
const deleteOne = objImport.deleteOne;

const customersRouter = express.Router();

/**
 * Get actions for customers database sent to customers controller
 */
customersRouter.get("/:cintID?", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let { cintID } = objRequest.params;
    let customerData;
    if (cintID) {
      customerData = await getOne(cintID);
    } else {
      customerData = await getAll();
    }
    objResponse.json(customerData);
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
 * Post actions for customers database sent to customers controller
 */
customersRouter.post("/", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let customerBody = objRequest.body;
    let customerData = await insertOne(customerBody);
    objResponse.json(customerData);
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
 * Put actions for customers database sent to customers controller
 */
customersRouter.put("/:cintID", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let { cintID } = objRequest.params;
    let customerBody = objRequest.body;
    let customerData = await updateOne(cintID, customerBody);
    objResponse.json(customerData);
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
 * Delete actions for customers database sent to customers controller
 */
customersRouter.delete("/:cintID", async (objRequest, objResponse, next) => {
  try {
    if (API.authenticateKey(objRequest))
      {
    let { cintID } = objRequest.params;
    let customerData = await deleteOne(cintID);
    objResponse.json(customerData);
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

module.exports = customersRouter;
