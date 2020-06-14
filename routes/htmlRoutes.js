const path = require("path");
// create instance of a router
const router = require("express").Router();

// send notes.html on get request at /notes url
router.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "notes.html"));
});

// send index.html on get request at any url
router.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = router;
