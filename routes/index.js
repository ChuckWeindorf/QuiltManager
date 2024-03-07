import express from "express";
import customersRouter from "./customers.route";
import salesRouter from "./sales.route";
import artifactsRouter from "./artifacts.route";
import sales_artifactsRouter from "./sales_artifacts.route";
import favoritesRouter from "./favorites.route";
import etsyRouter from "./etsy.route";

import fileUpload from "express-fileupload";

const mainRouter = express.Router();

mainRouter.use(fileUpload());
//Middleware
// this stands on top of /api/
mainRouter.use("/customers", customersRouter);
mainRouter.use("/sales", salesRouter);
mainRouter.use("/artifacts", artifactsRouter);
mainRouter.use("/sales_artifacts", sales_artifactsRouter);
mainRouter.use("/favorites", favoritesRouter);

mainRouter.use("/etsytaxonomy", etsyRouter);

export default mainRouter;
