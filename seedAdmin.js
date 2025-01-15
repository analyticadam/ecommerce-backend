require("dotenv").config(); // Load environment variables from .env
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user"); // Import the User model

// Function to seed a default admin user
const seedAdminUser = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Check if the admin user already exists
		const existingAdmin = await User.findOne({ email: "admin@example.com" });
		if (existingAdmin) {
			console.log("Admin user already exists");
			return;
		}

		// Hash the password for security
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash("admin123", salt);

		// Create a new admin user
		const admin = new User({
			username: "admin",
			email: "admin@example.com",
			password: hashedPassword,
			isAdmin: true,
		});

		// Save the admin user to the database
		await admin.save();
		console.log("Admin user created successfully");
	} catch (error) {
		console.error("Error creating admin user:", error);
	} finally {
		mongoose.connection.close(); // Close the database connection
	}
};

// Run the seeding function
seedAdminUser();
