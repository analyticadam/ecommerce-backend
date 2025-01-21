// Import required modules
const mongoose = require("mongoose");

// Define the schema for a shopping cart
const cartSchema = new mongoose.Schema({
	userId: { type: String, required: true }, // User ID for the cart
	items: [
		{
			productId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Item",
				required: true,
			},
			quantity: { type: Number, required: true },
		},
	],
});

const Cart = mongoose.model("Cart", cartSchema);

// Export the Cart model based on the schema
module.exports = mongoose.model("Cart", cartSchema);
