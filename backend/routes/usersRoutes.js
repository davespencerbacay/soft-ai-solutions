import express from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/usersControllers.js";

const router = express.Router();

router
    .route("/")
    .get(getAllUsers)
    .post(createUser)

router
    .route("/:value")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)


export default router;