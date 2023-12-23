import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/**
 * Middleware to protect routes by verifying JWT authentication token.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const protect = async (req, res, next) => {
  try {
    // Extract JWT token from cookies
    const token = req.cookies.jwt;

    // Check if the token is missing
    if (!token) {
      return res.status(401).json({
        message: 'Authentication failed: Token not provided.'
      });
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token is invalid
    if (!decodedToken) {
      return res.status(401).json({
        message: 'Authentication failed: Invalid token.'
      });
    }

    // Fetch user details and exclude the password
    req.user = await User.findById(decodedToken.userId).select('-password');

    // Continue to the next middleware or routes
    return next();
  } catch (error) {
    // Handle errors during the JWT verification process
    console.error('Error during token verification:', error);

    // Send an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

/**
 * Middleware to check if the user is an admin.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const admin = (req, res, next) => {
  try {
    // Get user details from the request
    const user = req.user;

    // Check if there is no user or if the user is not an admin
    if (!user || !user.isAdmin) {
      return res.status(401).json({
        message: 'Authorization failed: Not authorized as an admin.'
      });
    }

    // If the user is an admin, proceed to the next middleware or route
    return next();
  } catch (error) {
    // Handle errors during the admin verification process
    console.error('Error during admin check:', error);

    // Send an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export { protect, admin };
