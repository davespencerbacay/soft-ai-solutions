import express from "express";
import { createGroup, deleteGroup, getAllGroups, getSingleGroup, updateGroup } from "../controllers/groupControllers.js";

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


export default router;