const jwt = require("jsonwebtoken");

// Middleware to verify the provided token
const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1]; // Extract token from headers
	if (!token) return res.status(401).json({ message: "Access Denied" });

	try {
		// Verify the token and attach user data to the request object
		const verified = jwt.verify(token, process.env.JWT_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).json({ message: "Invalid Token" });
	}
};

// Middleware to check if the user is an admin
const verifyAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next(); // Allow access if the user is an admin
		} else {
			res.status(403).json({ message: "Admin access required" });
		}
	});
};

// Utility function to generate a token for testing
const generateAdminToken = (adminId) => {
	try {
		// Generate a JWT token with admin privileges
		const token = jwt.sign(
			{ id: adminId, isAdmin: true }, // Payload with admin ID and role
			process.env.JWT_SECRET, // Use the secret from environment variables
			{ expiresIn: "1h" } // Token expiration time
		);

		console.log("Generated Admin Token:", token); // Log the token for testing
		return token;
	} catch (error) {
		console.error("Error generating admin token:", error);
		return null;
	}
};

module.exports = { verifyToken, verifyAdmin, generateAdminToken }; // Export middleware and utility function
