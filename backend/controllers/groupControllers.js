import asyncHandler from "../middlewares/asyncHandler.js";
import groupServices from "../services/groupServices.js";
import usersServices from "../services/usersServices.js";
import rolesServices from "../services/rolesServices.js";
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
    const { userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
        throw new BadRequestError("[Groups] User IDs are required.");
    }

    const group = await groupServices.getSingleGroup("GroupId", groupId);
    if (!group) {
        throw new NotFoundError("[Groups] Group not found.");
    }

    const users = await Promise.all(userIds.map(userId => usersServices.getSingleUser("UserId", userId)));
    if (users.includes(undefined)) {
        throw new NotFoundError("[Groups] One or more Users not found.");
    }

    try {
        const updatedGroupUsers = await groupServices.assignUsersGroup(groupId, userIds);
        res.json(updatedGroupUsers);
    } catch (error) {
        console.error(error);
        throw new InternalError("[Groups] Error encountered while assigning users to a group.");
    }
});


const assignGroupRoles = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { roleIds } = req.body;

    if (!Array.isArray(roleIds) || roleIds.length === 0) {
        throw new BadRequestError("[Groups] Role Ids are required.");
    }

    const group = await groupServices.getSingleGroup("GroupId", groupId);
    if(!group) {
        throw new NotFoundError("[Groups] Group not found.")
    }

    const roles = await Promise.all(roleIds.map(roleId => rolesServices.getSingleRole("RoleId", roleId)));
    if (roles.includes(undefined)) {
        throw new NotFoundError("[Groups] One or more Roles not found.")
    }

    try {
        const updatedGroupRoles = await groupServices.assignGroupRoles(groupId, roleIds);
        res.json(updatedGroupRoles);
    } catch (error) {
        console.log(error);
        throw new InternalError("[Groups] Error encountered while assigning roles to a group.");
    }
});

const getSingleGroupWithAllDetails = asyncHandler(async (req, res) => {
    const { groupId } = req.params;

    const group = await groupServices.getSingleGroup("GroupId", groupId);
    if(!group) {
        throw new NotFoundError("[Groups] Group not found.")
    }
    
    try {
        const users = await groupServices.getSingleGroupWithUsers(groupId);
        const roles = await groupServices.getSingleGroupWithRoles(groupId);
        res.json({
            group,
            roles,
            users,
            noOfUsers: users.length,
            noOfRoles: roles.length
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
    assignGroupRoles,
    getSingleGroupWithAllDetails
};