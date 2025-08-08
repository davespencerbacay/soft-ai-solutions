import express from "express";
import { createUser, getAllUsers, getSingleUser } from "../controllers/usersController.js";

const router = express.Router();

router
    .route("/")
    .get(getAllUsers)
    .post(createUser)

router
    .route("/:value")
    .get(getSingleUser)


export default router;