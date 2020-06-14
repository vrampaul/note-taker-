// Dependencies
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

// Express app
const app = express();
const PORT = process.env.PORT || 8000;

// data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Start server to begin listening
app.listen(PORT, function () {
	console.log(`Listening on PORT ${PORT}`);
});
