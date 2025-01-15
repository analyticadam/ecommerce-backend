const jwt = require("jsonwebtoken");
const Users = require("../models/user.js");
const bcrypt = require("bcrypt");

async function getUsers(req, res) {
	try {
		const foundUsers = await Users.find({});
		res.status(200).json(foundUsers);
	} catch (err) {
		res.send(err).status(400);
	}
}

async function create(req, res) {
	try {
		console.log("Payload received in create:", req.body); // Log the received payload
		const createdUser = await Users.create(req.body); // Create the user in the database
		console.log(createdUser);
		const token = createJWT(createdUser); // Generate a JWT
		res.status(200).json({ token: token }); // Send the token back to the frontend
	} catch (err) {
		console.log("Error in create:", err); // Log any errors
		res.status(400).json(err); // Send a 400 response if there's an error
	}
}

async function login(req, res) {
	console.log("login"); // Indicate login flow started
	try {
		console.log("Payload received in login:", req.body); // Log the received payload
		const user = await Users.findOne({ username: req.body.username }); // Find the user by username
		console.log("Queried username:", req.body.username); // Debug username
		console.log("Found user:", user); // Log the found user

		if (!user) throw new Error("User not found"); // If no user, throw error
		console.log(req.body.password);
		const match = await bcrypt.compare(req.body.password, user.password); // Compare passwords
		console.log("Password match:", match); // Debug password match
		if (!match) throw new Error("Invalid password"); // If passwords don't match, throw error

		const token = createJWT(user); // Generate a JWT
		console.log("Generated token:", token); // Log the token
		res.json(token); // Send the token back to the frontend
	} catch (err) {
		console.log("Error in login:", err); // Log any errors
		res.status(400).json(err); // Send a 400 response if there's an error
	}
}

// function to create JTW for users
function createJWT(user) {
	console.log("Creating JWT for user:", user); // Debug user data passed to JWT

	return jwt.sign(
		// data payload
		{ user },
		process.env.SECRET,
		{ expiresIn: "24h" }
	);
}

module.exports = { create, createJWT, login, getUsers };
