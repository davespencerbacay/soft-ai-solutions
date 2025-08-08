import express from "express";
import { createModule, deleteModule, getAllModules, getSingleModule, updateModule } from "../controllers/modulesControllers.js";

const router = express.Router();

router
    .route("/")
    .get(getAllModules)
    .post(createModule)

router
    .route("/:value")
    .get(getSingleModule)
    .put(updateModule)
    .delete(deleteModule)


export default router;