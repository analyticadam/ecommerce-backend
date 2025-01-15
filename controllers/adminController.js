const Users = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function create(req, res) {
	try {
		const createdUser = await Users.create(req.body);
		const token = createJWT(createdUser);
		res.status(200).json(token);
	} catch (err) {
		res.status(400).json(err);
	}
}

async function login(req, res) {
	console.log("login");
	try {
		// query the database to find a user with the email provided
		const user = await Users.findOne({ username: req.body.username });
		console.log("Queried username:", req.body.username); // Debug the username being queried
		console.log("Found user:", user); // Log the found user
		// if the email does not exsist, throw an error
		if (!user) throw new Error("User not found");
		// if we find the user, compare the password, but it is stored encrypted
		// 1st argument is from the credentials that the user typed in
		// 2nd arguemtn is what is stored in the database
		const match = await bcrypt.compare(req.body.password, user.password);
		console.log("Password match:", match); // Debug if the password matches
		if (!match) throw new Error("Invalid password");
		const token = createJWT(user);
		console.log(token);
		res.json(token);
	} catch (err) {
		res.status(400).json(err);
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

module.exports = { create, createJWT, login };
