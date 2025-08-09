import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../utils/custom-errors/notAuthorizedError.js';
import loggedInUserServices from '../services/loggedInUserServices.js';

const checkPermission = async (req, res, next) => {
    const action = req.query.action
    const getLoggedInUserPermissions = await loggedInUserServices.getLoggedInUserPermissions(req.user.id);

    if (!getLoggedInUserPermissions.includes(action)) {
        throw new NotAuthorizedError("You are not authorized to perform this action");
    }

    next();
};

export default checkPermission;