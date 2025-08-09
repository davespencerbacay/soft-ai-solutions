import express from "express";
import { getLoggedInUserPermissions } from "../controllers/loggedInUserControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router
    .route("/permissions")
    .get(protect, getLoggedInUserPermissions)


export default router;