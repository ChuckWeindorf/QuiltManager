import express from "express";
import {
  getAll,
  getOne,
  insertOne,
  updateOne,
  deleteOne,
} from "../controllers/favorites.controller";

const favoritesRouter = express.Router();

/**
 * Get actions for favorites database sent to favorites controller
 */
favoritesRouter.get("/:cintID?", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let favoriteData;
    if (cintID) {
      favoriteData = await getOne(cintID);
    } else {
      favoriteData = await getAll();
    }

    objResponse.json(favoriteData);
    //console.log(favoriteData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Post actions for favorites database sent to favorites controller
 */
favoritesRouter.post("/", async (objRequest, objResponse, next) => {
  try {
    let favoriteBody = objRequest.body;
    let favoriteData = await insertOne(favoriteBody);
    objResponse.json(favoriteData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Put actions for favorites database sent to favorites controller
 */
favoritesRouter.put("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let favoriteBody = objRequest.body;
    let favoriteData = await updateOne(cintID, favoriteBody);
    objResponse.json(favoriteData);
  } catch (objError) {
    next(objError);
  }
});

/**
 * Delete actions for favorites database sent to favorites controller
 */
favoritesRouter.delete("/:cintID", async (objRequest, objResponse, next) => {
  try {
    let { cintID } = objRequest.params;
    let favoriteData = await deleteOne(cintID);
    objResponse.json(favoriteData);
  } catch (objError) {
    next(objError);
  }
});

export default favoritesRouter;
