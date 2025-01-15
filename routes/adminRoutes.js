const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middlewares/authMiddleware"); // Middleware for admin verification
const adminController = require("../controllers/adminController");

// this corresponds to regisiter on the frontend because register means add a new user
router.post("/", adminController.create);
// this corresponds to login on the frontend
router.post("/login", adminController.login);

module.exports = router; // Export the router
