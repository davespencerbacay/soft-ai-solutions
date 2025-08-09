import express from "express";
import { 
    assignUsersGroup, 
    createGroup, 
    deleteGroup, 
    getAllGroups, 
    getSingleGroup, 
    updateGroup, 
    getSingleGroupWithAllDetails,
    assignGroupRoles
} from "../controllers/groupControllers.js";

const router = express.Router();

router
    .route("/")
    .get(getAllGroups)
    .post(createGroup)

router
    .route("/:value")
    .get(getSingleGroup)
    .put(updateGroup)
    .delete(deleteGroup)

router
    .route("/:groupId/users")
    .post(assignUsersGroup)

router
    .route("/:groupId/roles")
    .post(assignGroupRoles)

router.get("/:groupId/all-details", getSingleGroupWithAllDetails)


export default router;