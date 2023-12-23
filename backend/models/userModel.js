import mongoose from 'mongoose';

// Define the schema for users
const userSchema = new mongoose.Schema(
  {
    // User's name
    name: {
      type: String,
      required: true
    },
    // User's email, must be unique
    email: {
      type: String,
      required: true,
      unique: true
    },
    // User's password
    password: {
      type: String,
      required: true
    },
    // Indicates whether the user is an admin or not
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
