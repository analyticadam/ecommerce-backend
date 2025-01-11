const express = require("express");
const Item = require("../models/Item"); // Import the Item model

const router = express.Router();

// CREATE: Add a new favorite item
router.post("/", async (req, res) => {
	try {
		const newItem = new Item(req.body); // Create a new item from the request body
		const savedItem = await newItem.save(); // Save the item to MongoDB
		res.status(201).json(savedItem); // Respond with the saved item
	} catch (error) {
		res.status(500).json({ error: error.message }); // Handle errors
	}
});

// READ: Get all favorite items
router.get("/", async (req, res) => {
	try {
		const items = await Item.find(); // Retrieve all items from MongoDB
		res.json(items); // Respond with the items
	} catch (error) {
		res.status(500).json({ error: error.message }); // Handle errors
	}
});

// UPDATE: Update a favorite item by ID
router.put("/:id", async (req, res) => {
	try {
		const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Return the updated item
		});
		res.json(updatedItem); // Respond with the updated item
	} catch (error) {
		res.status(500).json({ error: error.message }); // Handle errors
	}
});

// DELETE: Remove a favorite item by ID
router.delete("/:id", async (req, res) => {
	try {
		const deletedItem = await Item.findByIdAndDelete(req.params.id); // Delete the item by ID
		res.json(deletedItem); // Respond with the deleted item
	} catch (error) {
		res.status(500).json({ error: error.message }); // Handle errors
	}
});

module.exports = router; // Export the router
