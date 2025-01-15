const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true }, // User's unique username
		email: { type: String, required: true, unique: true }, // User's unique email
		password: { type: String, required: true }, // Hashed password for security
		isAdmin: { type: Boolean, default: false }, // Admin flag, default is false
	},
	{ timestamps: true }
); // Automatically adds createdAt and updatedAt timestamps

const Users = mongoose.model("User", userSchema);

// Export the User model based on the schema
module.exports = Users;
