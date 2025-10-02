const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

//Chatbot Dummy Route
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "Message is required" });

    // আপাতত dummy response, পরে external API call করবেন
    return res.json({ reply: `🤖 Bot Reply: You said "${message}"` });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ reply: "Server error" });
  }
});

//CSV Upload Route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Demo: ফাইল rename করে ফেরত পাঠানো হচ্ছে
    const newPath = path.join(__dirname, "../uploads", "citizen_result.csv");
    fs.renameSync(req.file.path, newPath);

    // Download file as response
    res.download(newPath, "citizen_result.csv");
  } catch (err) {
    console.error("CSV Upload Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
