import express from "express";
import { assignUsersGroup, createGroup, deleteGroup, getAllGroups, getSingleGroup, updateGroup, getSingleGroupWithUsers } from "../controllers/groupControllers.js";

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
    .get(getSingleGroupWithUsers)


export default router;