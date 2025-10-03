const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");  // external API call
const FormData = require("form-data");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * KOI JSON Input → External API এ হিট
 */
router.post("/input", async (req, res) => {
  try {
    const koiData = req.body;
    // External API এ json পাঠানো
    const response = await axios.post("http://13.200.246.18:8000/predict", koiData);
    res.json(response.data);
  } catch (err) {
    console.error("Input API Error:", err.message);
    res.status(500).json({ msg: "Server error while hitting KOI API" });
  }
});

/**
 * Upload CSV → External API এ হিট
 */
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post("http://13.200.246.18:8000/predict", formData, {
      headers: formData.getHeaders(),
      responseType: "arraybuffer", // CSV রিটার্ন হবে
    });

    // Response কে file হিসেবে ইউজারকে পাঠানো
    const outputPath = path.join(__dirname, "../uploads", "researcher_result.csv");
    fs.writeFileSync(outputPath, response.data);

    res.download(outputPath, "researcher_result.csv");
  } catch (err) {
    console.error("CSV Upload API Error:", err.message);
    res.status(500).json({ msg: "Server error while hitting CSV API" });
  }
});

/**
 *Train AI Model → External API এ হিট
 */
router.post("/train", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "CSV file required" });

    const { learning_rate, n_estimators, test_size } = req.body;

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));
    formData.append("learning_rate", learning_rate);
    formData.append("n_estimators", n_estimators);
    formData.append("test_size", test_size);

    const response = await axios.post("http://your-api-server/train-model", formData, {
      headers: formData.getHeaders(),
      responseType: "arraybuffer", // CSV রিটার্ন হবে
    });

    const outputPath = path.join(__dirname, "../uploads", "trained_model_result.csv");
    fs.writeFileSync(outputPath, response.data);

    res.download(outputPath, "trained_model_results.csv");
  } catch (err) {
    console.error("Train API Error:", err.message);
    res.status(500).json({ msg: "Server error while hitting Train API" });
  }
});

module.exports = router;