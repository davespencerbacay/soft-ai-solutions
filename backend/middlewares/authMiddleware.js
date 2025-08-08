import jwt from 'jsonwebtoken';
import NotAuthorizedError from '../utils/custom-errors/notAuthorizedError.js';

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      throw new NotAuthorizedError("[Auth] Invalid token.");
    }
  } else {
    throw new NotAuthorizedError("[Auth] No token provided.");
  }
};

export default protect;