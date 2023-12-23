import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the provided URI
    const connection = await mongoose.connect(process.env.MONGO_URI);

    // Log a detailed message if the connection is successful
    console.log(
      `MongoDB connected successfully on host: ${connection.connection.host}, database: ${connection.connection.db.databaseName}`
    );

    // Return the connection object for potential future use
    return connection;
  } catch (error) {
    // Log an error message if there's an issue with the connection
    console.error(`MongoDB connection error: ${error.message}`);

    // Exit the process with an error code
    process.exit(1);
  }
};

// Export the connectDB function
export default connectDB;
