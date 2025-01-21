const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Define routes for various cart operations
router.get("/:userId", cartController.getCart); // Route to get a user's cart

router.post("/:userId", cartController.addItem); // Route to add an item to the cart

router.put("/:userId/:itemId", cartController.updateItem); // Route to update an item quantity in the user's cart

router.delete("/:userId/:itemId", cartController.removeItem); // Route to remove item from the user's cart

module.exports = router; // Export the router for use in other parts of the application
