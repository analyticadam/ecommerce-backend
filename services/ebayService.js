// Import required modules
const axios = require("axios"); // For making HTTP requests

// Define eBay API constants
const EBAY_BASE_URL = "https://api.ebay.com"; // Base URL for eBay API
const CLIENT_ID = process.env.EBAY_CLIENT_ID; // eBay API Client ID from .env
const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET; // eBay API Client Secret from .env

// Function to fetch OAuth token from eBay
const getOAuthToken = async () => {
	try {
		const response = await axios.post(
			`${EBAY_BASE_URL}/identity/v1/oauth2/token`,
			null, // No body needed
			{
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				auth: { username: CLIENT_ID, password: CLIENT_SECRET },
				params: {
					grant_type: "client_credentials",
					scope: "https://api.ebay.com/oauth/api_scope",
				},
			}
		);
		return response.data.access_token; // Return the token
	} catch (error) {
		console.error("Error fetching eBay OAuth token:", error.message);
		throw error;
	}
};

// Function to search items on eBay
const searchItems = async (query) => {
	const token = await getOAuthToken(); // Fetch OAuth token
	try {
		const response = await axios.get(
			`${EBAY_BASE_URL}/buy/browse/v1/item_summary/search`,
			{
				headers: { Authorization: `Bearer ${token}` }, // Include token in headers
				params: { q: query }, // Query parameter for search
			}
		);
		return response.data.itemSummaries || []; // Return item summaries
	} catch (error) {
		console.error("Error searching eBay items:", error.message);
		throw error;
	}
};

// Export functions for use in other files
module.exports = { searchItems };
