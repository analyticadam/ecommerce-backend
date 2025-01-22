const Cart = require("../models/Cart");

// Get the cart for a specific user
exports.getCart = async (req, res) => {
	const { userId } = req.params; // Extract userId from request parameters
	try {
		// Find the user's cart and populate product details (only specific fields)
		let cart = await Cart.findOne({ userId }).populate(
			"items.productId",
			"title price"
		);
		console.log(cart);
		res.json(cart); // Return the cart data
	} catch (error) {
		// Send a detailed error response for debugging
		res.status(500).json({ error: "Failed to fetch cart. " + error.message });
	}
};

// Add an item to the cart
exports.addItem = async (req, res) => {
	const { userId } = req.params;
	const { productId, quantity } = req.body;

	try {
		if (!userId || !productId || quantity <= 0) {
			return res.status(400).json({ error: "Invalid input data" });
		}

		let cart = await Cart.findOne({ userId });
		if (cart) {
			const itemIndex = cart.items.findIndex(
				(item) => item.productId.toString() === productId
			);
			if (itemIndex > -1) {
				cart.items[itemIndex].quantity += quantity;
			} else {
				cart.items.push({ productId, quantity });
			}
		} else {
			cart = new Cart({ userId, items: [{ productId, quantity }] });
		}
		await cart.save();
		res.status(201).send(cart);
	} catch (error) {
		res
			.status(500)
			.json({ error: "Failed to add item to cart. " + error.message });
	}
};

// Update the quantity of an item in the cart
exports.updateItem = async (req, res) => {
	const { userId, itemId } = req.params; // Extract userId and itemId from the request parameters
	const { quantity } = req.body; // Extract the new quantity from the request body

	// Validate the quantity to ensure it is at least 1
	if (!quantity || quantity < 1) {
		return res.status(400).json({ error: "Quantity must be at least 1" });
	}

	try {
		// Find the user's cart
		const cart = await Cart.findOne({ userId });

		// If no cart is found, return a 404 response
		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}

		// Find the item in the cart by its itemId
		const item = cart.items.id(itemId);
		if (!item) {
			return res.status(404).json({ error: "Item not found in cart" });
		}

		// Update the item's quantity
		item.quantity = quantity;

		// Save the updated cart to the database
		await cart.save();

		// Return the updated cart
		res.status(200).json({ message: "Cart updated successfully", cart });
	} catch (error) {
		// Handle any errors and return a 500 status with the error message
		console.error("Error updating cart:", error);
		res.status(500).json({ error: "Failed to update cart. " + error.message });
	}
};

// Remove an item from the cart
exports.removeItem = async (req, res) => {
	const { userId, itemId } = req.params; // Extract item ID from request parameters
	console.log("userId", userId);
	console.log("itemId", itemId);
	try {
		// Find the cart for the given user and remove the specified item
		const cart = await Cart.findOne({ userId });

		if (!cart) {
			return res.status(404).json({ error: "Cart not found" });
		}

		// Filter out the item with the specified item ID
		const updatedItems = cart.items.filter(
			(item) => item._id.toString() !== itemId
		);

		if (cart.items.length === updatedItems.length) {
			return res.status(404).json({ error: "Item not found in cart" });
		}

		// Update the cart with the remaining items
		cart.items = updatedItems;
		await cart.save();

		res.status(200).json({ message: "Item removed successfully", cart });
	} catch (err) {
		console.log("Error removing item from cart:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};

// Clear all items from the cart
exports.deleteEntireCart = async (req, res) => {
	const { userId } = req.params;
	try {
		// Find and delete the cart for the given userId
		const deletedCart = await Cart.findOneAndDelete({ userId });
		if (!deletedCart) {
			return res.status(404).json({ message: "Cart not found" });
		}
		res.status(200).json({ message: "Cart deleted successfully" });
	} catch (err) {
		console.error("Error deleting entire cart:", err);
		res.status(500).json({ message: "Internal server error" });
	}
};
