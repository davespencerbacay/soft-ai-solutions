import asyncHandler from "../middlewares/asyncHandler.js";
import groupServices from "../services/groupServices.js";
import usersServices from "../services/usersServices.js";
import InternalError from "../utils/custom-errors/InternalError.js";
import BadRequestError from "../utils/custom-errors/BadRequestError.js"
import NotFoundError from "../utils/custom-errors/NotFoundError.js";

const getAllGroups = asyncHandler(async (req, res) => {
    try {
        const groups = await groupServices.getAllGroups();
        res.json(groups);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Groups] Error encounted in groups resource.")
    }
});

const createGroup = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
        throw new BadRequestError("[Groups] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Groups] Description is required.")
    }

    const group = await groupServices.getSingleGroup("name", name);

    if(group) {
        throw new BadRequestError("[Groups] Group with this name already exists.");
    }

    try {
        const newGroup = await groupServices.createGroup({
            name,
            description
        });
        res.json(newGroup);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Groups] Error encounted in groups resource.")
    }
});

const getSingleGroup = asyncHandler(async (req, res) => {
    const { value } = req.params;
    const { key } = req.query;

    const validKeys = ["GroupId", "Name"];

    if(!value) {
        throw new BadRequestError("[Groups] Group identifier is required.")
    }
    if(!key) {
        throw new BadRequestError("[Groups] Key is required to identify the group.")
    }

    if(!validKeys.includes(key)) {
        throw new BadRequestError("[Groups] Invalid key provided.")
    }

    const group = await groupServices.getSingleGroup(key, value);
    if(!group) {
        throw new NotFoundError("[Groups] Group not found.")
    }

    res.json(group);
});

const updateGroup = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { value : id } = req.params;

    if(!name) {
        throw new BadRequestError("[Groups] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Groups] Description is required.")
    }

    const group = await groupServices.getSingleGroup("GroupId", id);

    if(!group) {
        throw new NotFoundError("[Groups] Group not found.")
    }

    try {
        const updatedGroup = await groupServices.updateGroup({
            id: id,
            name,
            description
        });

        res.json(updatedGroup)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Groups] Error encountered while updating group.");
    }
});

const deleteGroup = asyncHandler(async (req, res) => {
    const { value : id } = req.params;

    const group = await groupServices.getSingleGroup("GroupId", id);

    if(!group) {
        throw new NotFoundError("[Groups] Group not found.")
    }

    try {
        const updatedGroup = await groupServices.deleteGroup(group);
        res.json(updatedGroup)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Groups] Error encountered while deleting group.");
    }
});

const assignUsersGroup = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    if(!userId) {
        throw new BadRequestError("[Groups] User ID is required.")
    }

    const group = await groupServices.getSingleGroup("GroupId", groupId);
    if(!group) {
        throw new NotFoundError("[Groups] Group not found.")
    }

    const user = await usersServices.getSingleUser("UserId", userId);
    if(!user) {
        throw new NotFoundError("[Groups] User not found.")
    }
    
    try {
        const updatedGroup = await groupServices.assignUsersGroup(groupId, userId);
        res.json(updatedGroup)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Groups] Error encountered while assigning users to a group.");
    }
});

const getSingleGroupWithUsers = asyncHandler(async (req, res) => {
    const { groupId } = req.params;

    const group = await groupServices.getSingleGroup("GroupId", groupId);
    if(!group) {
        throw new NotFoundError("[Groups] Group not found.")
    }
    
    try {
        const members = await groupServices.getSingleGroupWithUsers(groupId);
        res.json({
            group: group,
            members,
            noOfMembers: members.length
        });
    } catch (error) {
        console.log(error);
        throw new InternalError("[Groups] Error encountered while fetching users for group.");
    }
});

export { 
    getAllGroups,
    createGroup,
    getSingleGroup,
    updateGroup,
    deleteGroup,
    assignUsersGroup,
    getSingleGroupWithUsers
};