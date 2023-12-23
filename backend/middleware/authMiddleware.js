import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

//Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    // Read the jwt from cookie
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: 'Not authenticated'
      });
    }
    // Verify the jwt
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({
        message: 'Not authenticated'
      });
    }
    // Fetch the user details and exclude password
    req.user = await User.findById(decodedToken.userId).select('-password');
    // Continue to the next middleware or routes
    next();
  } catch (error) {
    // Handling errors during the jwt verification process
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
  try {
    const user = req.user;
    // Check if there is no user or if the user is not an admin
    if (!user || !user.isAdmin) {
      return res.status(401).json({
        message: 'Not authorized as Admin'
      });
    }
    // If the user is an admin, proceed to the next middleware or route
    next();
  } catch (error) {
    // Handling errors during the admin verification process
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export { protect, admin };
