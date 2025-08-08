import asyncHandler from "../middlewares/asyncHandler.js";
import modulesServices from "../services/modulesServices.js";
import InternalError from "../utils/InternalError.js";
import BadRequestError from "../utils/BadRequestError.js"
import NotFoundError from "../utils/NotFoundError.js";

const getAllModules = asyncHandler(async (req, res) => {
    try {
        const modules = await modulesServices.getAllModules();
        res.json(modules);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Modules] Error encounted in modules resource.")
    }
});

const createModule = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
        throw new BadRequestError("[Modules] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Modules] Description is required.")
    }

    const module = await modulesServices.getSingleModule("name", name);

    if(module) {
        throw new BadRequestError("[Modules] Module with this name already exists.");
    }

    try {
        const newModule = await modulesServices.createModule({
            name,
            description
        });
        res.json(newModule);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Modules] Error encounted in modules resource.")
    }
});

const getSingleModule = asyncHandler(async (req, res) => {
    const { value } = req.params;
    const { key } = req.query;

    const validKeys = ["id", "name"];

    if(!value) {
        throw new BadRequestError("[Modules] Module identifier is required.")
    }
    if(!key) {
        throw new BadRequestError("[Modules] Key is required to identify the module.")
    }

    if(!validKeys.includes(key)) {
        throw new BadRequestError("[Modules] Invalid key provided.")
    }

    const module = await modulesServices.getSingleModule(key, value);
    if(!module) {
        throw new NotFoundError("[Modules] Module not found.")
    }

    res.json(module);
});

const updateModule = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const { value : id } = req.params;

    if(!name) {
        throw new BadRequestError("[Modules] Name is required.")
    }
    if(!description) {
        throw new BadRequestError("[Modules] Description is required.")
    }

    const module = await modulesServices.getSingleModule("id", id);

    if(!module) {
        throw new NotFoundError("[Modules] Module not found.")
    }

    try {
        const updatedModule = await modulesServices.updateModule({
            id: module.id,
            name,
            description
        });

        res.json(updatedModule)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Modules] Error encountered while updating module.");
    }
});

const deleteModule = asyncHandler(async (req, res) => {
    const { value : id } = req.params;

    const module = await modulesServices.getSingleModule("id", id);

    if(!module) {
        throw new NotFoundError("[Modules] Module not found.")
    }

    try {
        const updatedModule = await modulesServices.deleteModule(module);
        res.json(updatedModule)
    } catch (error) {
        console.log(error);
        throw new InternalError("[Modules] Error encountered while deleting module.");
    }
});

export { 
    getAllModules,
    createModule,
    getSingleModule,
    updateModule,
    deleteModule
};