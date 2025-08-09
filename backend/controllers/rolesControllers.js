import asyncHandler from "../middlewares/asyncHandler.js";
import rolesServices from "../services/rolesServices.js";
import InternalError from "../utils/custom-errors/InternalError.js";
import BadRequestError from "../utils/custom-errors/BadRequestError.js"
import NotFoundError from "../utils/custom-errors/NotFoundError.js";

const getAllRoles = asyncHandler(async (req, res) => {
    const { permissions } = req.query;
    try {
        let roles; 

        if(permissions) {
            roles = await rolesServices.getAllRolesWithPermissions(permissions);
        } else {
            roles = await rolesServices.getAllRoles();
        }

        res.json(roles);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Roles] Error encounted in roles resource.")
    }
});

const createRole = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
        throw new BadRequestError("[Roles] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Roles] Description is required.")
    }

    const role = await rolesServices.getSingleRole("name", name);

    if(role) {
        throw new BadRequestError("[Roles] Role with this name already exists.");
    }

    try {
        const newRole = await rolesServices.createRole({
            name,
            description
        });
        res.json(newRole);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Roles] Error encounted in roles resource.")
    }
});

const getSingleRole = asyncHandler(async (req, res) => {
    const { value } = req.params;
    const { key } = req.query;

    const validKeys = ["RoleId", "Name"];

    if(!value) {
        throw new BadRequestError("[Roles] Role identifier is required.")
    }
    if(!key) {
        throw new BadRequestError("[Roles] Key is required to identify the role.")
    }

    if(!validKeys.includes(key)) {
        throw new BadRequestError("[Roles] Invalid key provided.")
    }

    const role = await rolesServices.getSingleRole(key, value);
    if(!role) {
        throw new NotFoundError("[Roles] Role not found.")
    }

    res.json(role);
});

const assignRolesPermission = asyncHandler(async (req, res) => {
    const { roleId } = req.params;
    const { permissionIds } = req.body;

    if (!Array.isArray(permissionIds)) {
        throw new BadRequestError("[Roles] Permission Ids should be array.");
    }

    const role = await rolesServices.getSingleRole("RoleId", roleId);
    if(!role) {
        throw new NotFoundError("[Roles] Role not found.")
    }

    try {
        const updatedRolePermissions = await rolesServices.assignRolePermissions(roleId, permissionIds);
        res.json(updatedRolePermissions);
    } catch (error) {
        console.log(error);
        throw new InternalError("[Roles] Error encountered while assigning permissions to role.");
    }
});

const updateRole = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { value : id } = req.params;

    if(!name) {
        throw new BadRequestError("[Roles] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Roles] Description is required.")
    }

    const role = await rolesServices.getSingleRole("RoleId", id);

    if(!role) {
        throw new NotFoundError("[Roles] Role not found.")
    }

    try {
        const updatedRole = await rolesServices.updateRole({
            id: id,
            name,
            description
        });

        res.json(updatedRole)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Roles] Error encountered while updating role.");
    }
});

const deleteRole = asyncHandler(async (req, res) => {
    const { value : id } = req.params;

    const role = await rolesServices.getSingleRole("RoleId", id);

    if(!role) {
        throw new NotFoundError("[Roles] Role not found.")
    }

    try {
        const updatedRole = await rolesServices.deleteRole(role);
        res.json(updatedRole)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Roles] Error encountered while deleting role.");
    }
});

export { 
    getAllRoles,
    createRole,
    getSingleRole,
    updateRole,
    deleteRole,
    assignRolesPermission
};