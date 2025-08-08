import asyncHandler from "../middlewares/asyncHandler.js";
import permissionsServices from "../services/permissionsServices.js";
import InternalError from "../utils/custom-errors/InternalError.js";
import BadRequestError from "../utils/custom-errors/BadRequestError.js"
import NotFoundError from "../utils/custom-errors/NotFoundError.js";

const getAllPermissions = asyncHandler(async (req, res) => {
    try {
        const permissions = await permissionsServices.getAllPermissions();
        res.json(permissions);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Permissions] Error encounted in permissions resource.")
    }
});

const createPermission = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
        throw new BadRequestError("[Permissions] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Permissions] Description is required.")
    }

    const permission = await permissionsServices.getSinglePermission("name", name);

    if(permission) {
        throw new BadRequestError("[Permissions] Permission with this name already exists.");
    }

    try {
        const newPermission = await permissionsServices.createPermission({
            name,
            description
        });
        res.json(newPermission);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Permissions] Error encounted in permissions resource.")
    }
});

const getSinglePermission = asyncHandler(async (req, res) => {
    const { value } = req.params;
    const { key } = req.query;

    const validKeys = ["id", "name"];

    if(!value) {
        throw new BadRequestError("[Permissions] Permission identifier is required.")
    }
    if(!key) {
        throw new BadRequestError("[Permissions] Key is required to identify the permission.")
    }

    if(!validKeys.includes(key)) {
        throw new BadRequestError("[Permissions] Invalid key provided.")
    }

    const permission = await permissionsServices.getSinglePermission(key, value);
    if(!permission) {
        throw new NotFoundError("[Permissions] Permission not found.")
    }

    res.json(permission);
});

const updatePermission = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { value : id } = req.params;

    if(!name) {
        throw new BadRequestError("[Permissions] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Permissions] Description is required.")
    }

    const permission = await permissionsServices.getSinglePermission("id", id);

    if(!permission) {
        throw new NotFoundError("[Permissions] Permission not found.")
    }

    try {
        const updatedPermission = await permissionsServices.updatePermission({
            id: permission.id,
            name,
            description
        });

        res.json(updatedPermission)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Permissions] Error encountered while updating permission.");
    }
});

const deletePermission = asyncHandler(async (req, res) => {
    const { value : id } = req.params;

    const permission = await permissionsServices.getSinglePermission("id", id);

    if(!permission) {
        throw new NotFoundError("[Permissions] Permission not found.")
    }

    try {
        const updatedPermission = await permissionsServices.deletePermission(permission);
        res.json(updatedPermission)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Permissions] Error encountered while deleting permission.");
    }
});

export { 
    getAllPermissions,
    createPermission,
    getSinglePermission,
    updatePermission,
    deletePermission
};