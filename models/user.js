const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

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

userSchema.pre("save", async function (next) {
	// "this" is the user doc
	if (!this.isModified("password")) return next();
	// if the password has changed, we need to update the password with the computed hash
	this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
	return next();
});

const Users = mongoose.model("User", userSchema);

// Export the User model based on the schema
module.exports = Users;
