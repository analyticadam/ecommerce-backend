// Import required modules
const express = require("express"); // Framework for creating the server
const dotenv = require("dotenv"); // For managing environment variables
const cors = require("cors"); // To enable cross-origin resource sharing
const ebayRoutes = require("./routes/ebayRoutes"); // Import eBay-related routes
const itemRoutes = require("./routes/itemRoutes"); // Import item routes
const adminRoutes = require("./routes/adminRoutes"); //Import admin routes
const db = require("./config/conn.js"); // Database connection

// Load environment variables from .env file
require("dotenv").config();

// Create an Express application
const app = express();

// Define the port, defaulting to 5000 if not specified in .env
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests and handle CORS
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

app.get("/", (req, res) => {
	res.send("hello");
});

// Register CRUD routes for items
app.use("/api/items", itemRoutes);

// Register routes for eBay-related endpoints
app.use("/api/ebay", ebayRoutes);

// Register user route
app.use("/api/users", adminRoutes);

// Catch-all route for undefined endpoints
// Helps to handle incorrect API requests gracefully
app.use((req, res) => {
	res.status(404).json({ error: "Endpoint not found" });
});

// Global error handler for unexpected server errors
// Ensures consistent error responses and logs details for debugging
app.use((err, req, res, next) => {
	console.error("Server Error:", err.message); // Log the error message
	res.status(500).json({ error: "Internal Server Error" }); // Respond with a generic error message
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
