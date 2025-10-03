const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { default: axios } = require("axios");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

//Chatbot Dummy Route
router.post("/chat", async (req, res) => {
  try {
    const { message, session_id } = req.body;
    console.log(message, session_id);
    if (!message) return res.status(400).json({ reply: "Message is required" });
    const response=await axios.post(`http://13.200.246.18:8000/chat?api_key=${process.env.API_KEY}`, { message, session_id });
    const reply=response.data.response;
    res.json({ reply });
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
