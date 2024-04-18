const express = require("express");
const fileUpload = require("express-fileupload");

const customersRouter = require("./customers.route");
const salesRouter = require("./sales.route");
const artifactsRouter = require("./artifacts.route");
const sales_artifactsRouter = require("./sales_artifacts.route");
const favoritesRouter = require("./favorites.route");
const etsyRouter = require("./etsy.route");
const loginRouter = require("./login.route");
const imagesRouter = require("./images.route");


const mainRouter = express.Router();
mainRouter.use(express.json());

const imageRouter = express.Router();
imageRouter.use(fileUpload());
//
//Middleware
// this stands on top of /api/
mainRouter.use("/customers", customersRouter);
mainRouter.use("/sales", salesRouter);
mainRouter.use("/artifacts", artifactsRouter);
mainRouter.use("/sales_artifacts", sales_artifactsRouter);
mainRouter.use("/favorites", favoritesRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/etsytaxonomy", etsyRouter);
//this stands on top of /upload/
imageRouter.use("/image", imagesRouter);

module.exports = { mainRouter, imageRouter }; 

