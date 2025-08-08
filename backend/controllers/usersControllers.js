import bcrypt from 'bcryptjs';
import asyncHandler from "../middlewares/asyncHandler.js";
import usersServices from "../services/usersServices.js";
import InternalError from "../utils/custom-errors/InternalError.js";
import BadRequestError from "../utils/custom-errors/BadRequestError.js"
import NotFoundError from "../utils/custom-errors/NotFoundError.js";
import generateToken from '../utils/generateToken.js';

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
    const { firstName, lastName, emailAddress, password } = req.body;

    if(!firstName) {
        throw new BadRequestError("[Users] First name is required.")
    }
    if(!lastName) {
        throw new BadRequestError("[Users] Last name is required.")
    }
    if(!emailAddress) {
        throw new BadRequestError("[Users] Email address is required.")
    }
    if(!password) {
        throw new BadRequestError("[Users] Password is required.")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersServices.getSingleUser("emailAddress", emailAddress);

    if(user) {
        throw new BadRequestError("[Users] User with this email address already exists.");
    }

    try {
        const newUser = await usersServices.createUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            bio: req.body.bio,
            password: hashedPassword,
        });
        res.json(newUser);
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

const updateUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress } = req.body;
    const { value : id } = req.params;

    if(!firstName) {
        throw new BadRequestError("[Users] First name is required.")
    }
    if(!lastName) {
        throw new BadRequestError("[Users] Last name is required.")
    }
    if(!emailAddress) {
        throw new BadRequestError("[Users] Email address is required.")
    }

    const user = await usersServices.getSingleUser("id", id);

    if(!user) {
        throw new NotFoundError("[Users] User not found.")
    }

    try {
        const updatedUser = await usersServices.updateUser({
            id: user.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            bio: req.body.bio,
        });

        res.json(updatedUser)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Users] Error encountered while updating user.");
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const { value : id } = req.params;

    const user = await usersServices.getSingleUser("id", id);

    if(!user) {
        throw new NotFoundError("[Users] User not found.")
    }

    try {
        const updatedUser = await usersServices.deleteUser(user);
        res.json(updatedUser)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Users] Error encountered while deleting user.");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { emailAddress, password } = req.body;

    if(!emailAddress) {
        throw new BadRequestError("[Users] Email address is required.")
    }
    if(!password) {
        throw new BadRequestError("[Users] Password is required.")
    }

    const user = await usersServices.getSingleUser("emailAddress", emailAddress);
    if(!user) {
        throw new NotFoundError("[Users] User not found.")
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new BadRequestError("[Users] Invalid credentials.");
    }

    const token = generateToken(user.id);
    res.json({ user, token });
});

export { 
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    authUser
};