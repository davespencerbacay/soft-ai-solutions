import asyncHandler from "../middlewares/asyncHandler.js";
import usersServices from "../services/usersServices.js";
import InternalError from "../utils/InternalError.js";
import BadRequestError from "../utils/BadRequestError.js"
import NotFoundError from "../utils/NotFoundError.js";

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await usersServices.getAllUsers();
        res.json(users);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Users] Error encounted in users resource.")
    }
});

const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress } = req.body;

    if(!firstName) {
        throw new BadRequestError("[Users] First name is required.")
    }
    if(!lastName) {
        throw new BadRequestError("[Users] Last name is required.")
    }
    if(!emailAddress) {
        throw new BadRequestError("[Users] Email address is required.")
    }

    try {
        const users = await usersServices.createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
        });
        res.json(users);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Users] Error encounted in users resource.")
    }
});

const getSingleUser = asyncHandler(async (req, res) => {
    const { value } = req.params;
    const { key } = req.query;

    const validKeys = ["id", "firstName", "lastName", "emailAddress"];

    if(!value) {
        throw new BadRequestError("[Users] User identifier is required.")
    }
    if(!key) {
        throw new BadRequestError("[Users] Key is required to identify the user.")
    }

    if(!validKeys.includes(key)) {
        throw new BadRequestError("[Users] Invalid key provided.")
    }

    const user = await usersServices.getSingleUser(key, value);
    if(!user) {
        throw new NotFoundError("[Users] User not found.")
    }

    res.json(user);
});

export { 
    getAllUsers,
    createUser,
    getSingleUser
};