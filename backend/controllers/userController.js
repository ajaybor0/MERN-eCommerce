import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';

// @desc     Auth user & get token
// @method   POST
// @endpoint /api/users/login
// @access   Public
const loginUser = async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;

    // Finding the user in the database based on the provided email
    const user = await User.findOne({ email });

    // If the user does not exist, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({
        message: 'Invalid email address. Please check your email and try again.'
      });
    }

    // Comparing the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return a 401 Unauthorized response
    if (!match) {
      return res.status(401).json({
        message: 'Invalid password. Please check your password and try again.'
      });
    }

    // Call the generateToken function with the response object and user data
    generateToken(res, user._id.toString());

    // Sending a success response with user information
    return res.status(200).json({
      message: 'Login successful.',
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    // Handling errors during the login process
    console.error('Error during login:', error);

    // Sending an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Register user
// @method   POST
// @endpoint /api/users
// @access   Public
const registerUser = async (req, res) => {
  try {
    // Extracting user information from the request body
    const { name, email, password } = req.body;

    // Check if a user with the given email already exists in the database
    const userExists = await User.findOne({ email });

    // If the user with the given email already exists, send a response indicating the conflict
    if (userExists) {
      return res.status(409).json({
        message: 'User already exists. Please choose a different email.'
      });
    }

    // Hashing the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user instance
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Saving the user to the database
    await user.save();

    // Call the generateToken function with the response object and user data
    generateToken(res, user._id.toString());

    // Sending a success response with the registered user information
    return res.status(201).json({
      message: 'Registration successful. Welcome!',
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    // Handling errors during the registration process
    console.error('Error registering user:', error);

    // Sending an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Logout user / clear cookie
// @method   POST
// @endpoint /api/users/logout
// @access   Private
const logoutUser = async (req, res) => {
  try {
    // Clearing the JWT cookie to log the user out
    res.clearCookie('jwt', { httpOnly: true });

    // Sending a success response for a successful logout
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    // Handling errors during the logout process
    console.error('Error during logout:', error);

    // Sending an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Get user profile
// @method   GET
// @endpoint /api/users/profile
// @access   Private
const getUserProfile = async (req, res) => {
  try {
    // Retrieve user information using the user ID from the request object
    const user = await User.findById(req.user._id);

    // If the user is not found, send a 404 response and return to avoid further execution
    if (!user) {
      return res.status(404).json({
        message: 'User not found!'
      });
    }

    // Send a success response with user information
    return res.status(200).json({
      message: 'User profile retrieved successfully',
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    // Handle errors during the user profile retrieval
    console.error('Error getting user profile:', error);

    // Send an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Get users
// @method   GET
// @endpoint /api/users
// @access   Private/Admin
const getUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Check if any users are found
    if (!users || users.length === 0) {
      // Return a 404 response if no users are found
      return res.status(404).json({
        message: 'No users found.'
      });
    }

    // Send a success response with the list of users
    return res.status(200).json(users);
  } catch (error) {
    // Handle errors during the retrieval of users
    console.error('Error getting users:', error);

    // Send an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Get user
// @method   GET
// @endpoint /api/users/:userId
// @access   Private/Admin
const getUserById = async (req, res) => {
  try {
    res.status(200).json('Get user by id');
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Update user
// @method   PUT
// @endpoint /api/users/:userId
// @access   Private/Admin
const updateUser = async (req, res) => {
  try {
    res.status(200).json('Update user');
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Update user profile
// @method   PUT
// @endpoint /api/users/profile
// @access   Private
const updateUserProfile = async (req, res) => {
  try {
    // Extracting user information from the request body
    const { name, email, password } = req.body;

    // Hashing the user's password before saving it to the database
    const user = await User.findById(req.user._id);

    // Check if the user is found
    if (!user) {
      return res.status(404).json({
        message: 'User not found. Unable to update profile.'
      });
    }

    // Update user fields based on provided data
    user.name = name || user.name;
    user.email = email || user.email;

    // Update the password only if a new password is provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Send a success response with the updated user information
    return res.status(200).json({
      message: 'User profile updated successfully.',
      userId: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } catch (error) {
    // Handle errors during the user profile update
    console.error('Error updating user profile:', error);

    // Send an internal server error response
    return res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

// @desc     Delete user
// @method   DELETE
// @endpoint /api/users/:userId
// @access   Private/Admin
const deleteUser = async (req, res) => {
  try {
    res.status(200).json('Delete user');
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getUsers,
  getUserById,
  updateUser,
  updateUserProfile,
  deleteUser
};
