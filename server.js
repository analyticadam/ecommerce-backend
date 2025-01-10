const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error(err));

app.get("/", (req, res) => {
	res.send("Backend is running!");
});

app.listen(process.env.PORT || 5000, () =>
	console.log("Server running on port 5000")
);
