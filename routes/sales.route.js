import express from "express";
import {
  getAll,
  getOne,
  insertOne,
  getAllCust,
  updateOne,
  deleteOne,
} from "../controllers/sales.controller";

const salesRouter = express.Router();

/**
 * Get actions for sales table WITH customer filter sent to sales controller
 */
salesRouter.get("/customer/:cintID?", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let saleData = await getAllCust(cintID);
    objResponse.json(saleData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Get actions for sales database sent to sales controller
 */
salesRouter.get("/:cintID?", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let saleData;
    if (cintID) {
      saleData = await getOne(cintID);
    } else {
      saleData = await getAll();
    }

    objResponse.json(saleData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Post actions for sales database sent to sales controller
 */
salesRouter.post("/", async (objRequest, objResponse, next) => {
  try {
    let saleBody = objRequest.body;
    let saleData = await insertOne(saleBody);
    objResponse.json(saleData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Put actions for sales database sent to sales controller
 */
salesRouter.put("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let saleBody = objRequest.body;
    let saleData = await updateOne(cintID, saleBody);
    objResponse.json(saleData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Delete actions for sales database sent to sales controller
 */
salesRouter.delete("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let saleData = await deleteOne(cintID);
    objResponse.json(saleData);
  } catch (objError) {
    next(objError);
  }
});

export default salesRouter;
