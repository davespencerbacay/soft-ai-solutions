import express from "express";
import { createModule, deleteModule, getAllModules, getSingleModule, updateModule } from "../controllers/modulesControllers.js";
import protect from "../middlewares/authMiddleware.js";
import checkPermission from "../middlewares/checkPermission.js"

const router = express.Router();

router
    .route("/")
    .get(getAllModules)
    .post(protect, checkPermission, createModule)

router
    .route("/:value")
    .get(getSingleModule)
    .put(protect, checkPermission, updateModule)
    .delete(protect, checkPermission, deleteModule)


export default router;