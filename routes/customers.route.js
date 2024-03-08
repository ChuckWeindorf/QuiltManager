const express = require("express");

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
    let { cintID } = objRequest.params;
    let customerData;
    if (cintID) {
      customerData = await getOne(cintID);
    } else {
      customerData = await getAll();
    }

    objResponse.json(customerData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Post actions for customers database sent to customers controller
 */
customersRouter.post("/", async (objRequest, objResponse, next) => {
  try {
    let customerBody = objRequest.body;
    let customerData = await insertOne(customerBody);
    objResponse.json(customerData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Put actions for customers database sent to customers controller
 */
customersRouter.put("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let customerBody = objRequest.body;
    let customerData = await updateOne(cintID, customerBody);
    objResponse.json(customerData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Delete actions for customers database sent to customers controller
 */
customersRouter.delete("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let customerData = await deleteOne(cintID);
    objResponse.json(customerData);
  } catch (objError) {
    next(objError);
  }
});

module.exports = customersRouter;
