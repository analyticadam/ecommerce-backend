// Import required modules
const mongoose = require("mongoose");

// Define the schema for a shopping cart
const cartSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId, // Type set as ObjectId for MongoDB documents
		ref: "User", // Reference to the User model
		required: true, // Mandatory field
	},
	items: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			}, // Reference to Product model
			quantity: { type: Number, required: true, min: 1 }, // Quantity of the product, must be at least 1
		},
	],
});

// Export the Cart model based on the schema
module.exports = mongoose.model("Cart", cartSchema);
