// Import required modules
const mongoose = require("mongoose");

// Define the schema for an Item document
const itemSchema = new mongoose.Schema({
	title: { type: String, required: false, default: "title" }, // Title of the item
	price: { type: Number, required: false, min: 0, default: 0 }, // Price of the item (minimum value is 0)
	currency: { type: String, required: false, default: "USD" }, // Currency of the price
	image: {
		type: [String], // Array of strings for image URLs
		validate: {
			validator: function (v) {
				// Check if all elements in the array are strings
				return Array.isArray(v) && v.every((url) => typeof url === "string");
			},
			message: "All image URLs must be strings", // Validation error message
		},
		required: false,
		default: "hello", // Images are optional
	},
	link: { type: String, required: false, default: "hello" }, // URL to the item on eBay
});

// Export the Item model based on the schema
module.exports = mongoose.model("Item", itemSchema);
