import express from "express";
import { createRole, deleteRole, getAllRoles, getSingleRole, updateRole, assignRolesPermission } from "../controllers/rolesControllers.js";

const router = express.Router();

router
    .route("/")
    .get(getAllRoles)
    .post(createRole)

router
    .route("/:value")
    .get(getSingleRole)
    .put(updateRole)
    .delete(deleteRole)

router
    .route("/:roleId/permissions")
    .post(assignRolesPermission)


export default router;