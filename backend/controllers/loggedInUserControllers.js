import asyncHandler from "../middlewares/asyncHandler.js";
import loggedInUserServices from "../services/loggedInUserServices.js";
import InternalError from "../utils/custom-errors/InternalError.js";

const getLoggedInUserPermissions = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id; 
        const userPermissions = await loggedInUserServices.getLoggedInUserPermissions(userId)
        res.json(userPermissions);
    } catch (error) {
        console.log(error)
        throw new InternalError("[Groups] Error encounted in groups resource.")
    }
});

export { 
    getLoggedInUserPermissions,
};