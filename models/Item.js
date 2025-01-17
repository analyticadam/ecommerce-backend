// Import required modules
const mongoose = require("mongoose");

// Define the schema for an Item document
const itemSchema = new mongoose.Schema({
	title: { type: String, required: true }, // Title of the item
	price: { type: Number, required: true, min: 0 }, // Price of the item/ Minimum value is 0
	currency: { type: String, required: true }, // Currency of the price
	link: { type: String, required: true }, // URL to the item on eBay
});

// Export the Item model based on the schema
module.exports = mongoose.model("Item", itemSchema);
