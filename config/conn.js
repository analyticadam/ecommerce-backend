// Import required modules
const mongoose = require("mongoose"); // Mongoose for interacting with MongoDB
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Get MongoDB URI from .env file
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB Atlas
mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB Atlas"))
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1); // Exit process if connection fails
	});

// Export the database connection
module.exports = mongoose.connection;
