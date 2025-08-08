import express from "express";
import { createPermission, deletePermission, getAllPermissions, getSinglePermission, updatePermission } from "../controllers/permissionsControllers.js";

const router = express.Router();

router
    .route("/")
    .get(getAllPermissions)
    .post(createPermission)

router
    .route("/:value")
    .get(getSinglePermission)
    .put(updatePermission)
    .delete(deletePermission)


export default router;