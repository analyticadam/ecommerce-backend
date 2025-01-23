const express = require("express");
const Item = require("../models/Item"); // Import the Item model
const multer = require("multer"); // Import multer for file uploads
const router = express.Router();

const storage = multer.diskStorage({
	destination: "uploads/",
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
}); // Create a new storage engine

// const upload = multer({
// 	storage,
// 	fileFilter,
// 	limits: { fileSize: 5 * 1024 * 1024 },
// }); // Create a new upload instance

// const fileFilter = (req, file, cb) => {
// 	if (file.mimetype.startsWith("image/")) {
// 		cb(null, true);
// 	} else {
// 		cb(new Error("Not an image! Please upload images only."), false);
// 	}
// };

// Add picture to item
// router.post("/upload", upload.single("file"), (req, res) => {
// 	res.send("File uploaded successfully"); // Send a success message
// });

// CREATE: Add a new favorite item
router.post("/", async (req, res) => {
	console.log("I am getting something");
	// try {
	// 	const newItem = new Item(req.body); // Create a new item from the request body
	// 	const savedItem = await newItem.save(); // Save the item to MongoDB
	// 	res.status(201).json(savedItem); // Respond with the saved item
	// } catch (error) {
	// 	res.status(500).json({ error: error.message }); // Handle errors
	// }
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
