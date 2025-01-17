const Cart = require("../models/Cart");

// Get the cart for a specific user
exports.getCart = async (req, res) => {
	const { userId } = req.params; // Extract userId from request parameters
	try {
		// Find the user's cart and populate product details (only specific fields)
		const cart = await Cart.findOne({ userId }).populate(
			"items.productId",
			"title price"
		);
		res.json(cart); // Return the cart data
	} catch (error) {
		// Send a detailed error response for debugging
		res.status(500).json({ error: "Failed to fetch cart. " + error.message });
	}
};

// Add an item to the cart
exports.addItem = async (req, res) => {
	const { userId, productId, quantity } = req.body; // Extract cart details from request body
	try {
		// Validate the input data
		if (!userId || !productId || quantity <= 0) {
			return res.status(400).json({ error: "Invalid input data" });
		}

		let cart = await Cart.findOne({ userId });
		if (cart) {
			// Check if the product already exists in the cart
			const itemIndex = cart.items.findIndex(
				(item) => item.productId.toString() === productId
			);
			if (itemIndex > -1) {
				// Update quantity if the product exists
				cart.items[itemIndex].quantity += quantity;
			} else {
				// Add a new product to the cart if it doesn't exist
				cart.items.push({ productId, quantity });
			}
		} else {
			// Create a new cart for the user if it doesn't exist
			cart = new Cart({ userId, items: [{ productId, quantity }] });
		}
		await cart.save(); // Save the updated cart to the database
		res.status(201).send(cart); // Respond with the updated cart
	} catch (error) {
		// Send an error response
		res
			.status(500)
			.json({ error: "Failed to add item to cart. " + error.message });
	}
};

// Update the quantity of an item in the cart
exports.updateItem = async (req, res) => {
	const { id } = req.params; // Extract item ID from request parameters
	const { quantity } = req.body; // Extract the new quantity from the request body
	try {
		// Update the quantity of the specified item
		const cart = await Cart.findOneAndUpdate(
			{ "items._id": id },
			{ $set: { "items.$.quantity": quantity } },
			{ new: true } // Return the updated cart
		);
		res.json(cart); // Respond with the updated cart
	} catch (error) {
		// Send an error response
		res.status(500).json({ error: "Failed to update item. " + error.message });
	}
};

// Remove an item from the cart
exports.removeItem = async (req, res) => {
	const { id } = req.params; // Extract item ID from request parameters
	try {
		// Remove the specified item from the cart
		const cart = await Cart.findOneAndUpdate(
			{ "items._id": id },
			{ $pull: { items: { _id: id } } },
			{ new: true } // Return the updated cart
		);
		res.json(cart); // Respond with the updated cart
	} catch (error) {
		// Send an error response
		res
			.status(500)
			.json({ error: "Failed to remove item from cart. " + error.message });
	}
};
