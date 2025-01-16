const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
	const { userId } = req.params;
	const cart = await Cart.findOne({ userId }).populate("items.productId");
	res.json(cart);
};

exports.addItem = async (req, res) => {
	const { userId, productId, quantity } = req.body;
	let cart = await Cart.findOne({ userId });
	if (cart) {
		// logic to add item
	} else {
		// logic to create new cart
	}
	res.status(201).send(cart);
};

exports.updateItem = async (req, res) => {
	// update item logic
};

exports.removeItem = async (req, res) => {
	// remove item logic
};
