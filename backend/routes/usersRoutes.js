import express from "express";
import { authUser, createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/usersControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router
    .route("/")
    .get(protect, getAllUsers)
    .post(createUser)

router.post("/login", authUser)

router
    .route("/:value")
    .get(protect, getSingleUser)
    .put(protect, updateUser)
    .delete(protect, deleteUser)


export default router;