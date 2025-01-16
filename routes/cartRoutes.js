const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Define routes for various cart operations
router.get("/:userId", cartController.getCart); // Route to get a user's cart
router.post("/add", cartController.addItem); // Route to add an item to the cart
router.put("/update/:itemId", cartController.updateItem); // Route to update an item in the cart
router.delete("/delete/:itemId", cartController.removeItem); // Route to remove an item from the cart

module.exports = router; // Export the router for use in other parts of the application
