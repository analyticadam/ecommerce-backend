// Import required modules
const express = require("express"); // Framework for creating routes

// Create a new router instance
const router = express.Router();

const { searchItems } = require("../services/ebayService"); // eBay service functions

// GET route to search items on eBay
// Endpoint: /api/ebay/search
router.get("/search", async (req, res) => {
	try {
		const query = req.query.q; // Extract search query from request
		const items = await searchItems(query); // Search eBay items using service
		res.json(items); // Return the results as JSON
	} catch (error) {
		res.status(500).json({ error: error.message }); // Return error message
	}
});

// Export the router
module.exports = router;
