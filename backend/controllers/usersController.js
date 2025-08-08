import asyncHandler from "../middlewares/asyncHandler.js";
import usersServices from "../services/usersServices.js";

const getUsers = asyncHandler(async (req, res) => {
    const users = await usersServices.getUsers();
    res.json(users);
});

export { 
    getUsers 
};