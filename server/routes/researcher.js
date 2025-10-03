const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios"); // external API call
const FormData = require("form-data");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
// const upload = multer({ dest: "uploads/" });

/**
 * KOI JSON Input → External API এ হিট
 */
router.post("/input", async (req, res) => {
  try {
    const koiData = req.body;
    // External API এ json পাঠানো
    const response = await axios.post(
      "http://13.200.246.18:8000/predict",
      koiData
    );
    res.json(response.data);
  } catch (err) {
    console.error("Input API Error:", err.message);
    res.status(500).json({ msg: "Server error while hitting KOI API" });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "No file uploaded",
      });
    }
    // Read file as binary buffer
    const fileBuffer = fs.readFileSync(req.file.path);

    // Convert to binary string (this is what the API expects)
    const binaryString = fileBuffer.toString("binary");
console.log(binaryString);

    // Send as binary string with proper content type
    const response = await axios.post(
      "http://13.200.246.18:8000/predict_csv", binaryString );
    console.log("Response from external API:", response.data);
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    // Check what type of response we got
    if (response.headers["content-type"]?.includes("application/json")) {
      // JSON response - send as JSON
      return res.json({
        success: true,
        data: response.data,
      });
    } else if (
      response.headers["content-type"]?.includes("text/csv") ||
      typeof response.data === "string"
    ) {
      // CSV response - send as file download
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="prediction_results.csv"'
      );
      return res.send(response.data);
    } else {
      // Binary response - handle accordingly
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="results.bin"'
      );
      return res.send(response.data);
    }
  } catch (err) {
    console.error("CSV Upload API Error:", err.message);

    // Clean up uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Handle different error types
    if (err.response) {
      console.error(
        "External API response error:",
        err.response.status,
        err.response.data
      );

      if (err.response.status === 422) {
        // Validation error from FastAPI
        return res.status(422).json({
          success: false,
          msg: "Validation error in external API",
          detail: err.response.data.detail,
        });
      }

      return res.status(err.response.status).json({
        success: false,
        msg: `External API error: ${err.response.status}`,
        error: err.response.data,
      });
    } else if (err.request) {
      // Network error
      return res.status(503).json({
        success: false,
        msg: "Cannot connect to external API service",
      });
    } else {
      // Other errors
      return res.status(500).json({
        success: false,
        msg: "Server error while processing file",
      });
    }
  }
});
/**
 *Train AI Model → External API এ হিট
 */
router.post("/train", upload.single("file"), async (req, res) => {
  console.log("Train endpoint hit");
  try {
    if (!req.file) return res.status(400).json({ msg: "CSV file required" });

    const { learning_rate, n_estimators, test_size } = req.body;

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));
    formData.append("learning_rate", learning_rate);
    formData.append("n_estimators", n_estimators);
    formData.append("test_size", test_size);

    const response = await axios.post(
      "http://13.200.246.18:8000/train",
      formData
    );
    console.log(response.data);

    const outputPath = path.join(
      __dirname,
      "../uploads",
      "trained_model_result.csv"
    );
    fs.writeFileSync(outputPath, response.data);

    res.download(outputPath, "trained_model_results.csv");
  } catch (err) {
    console.error("Train API Error:", err.message);
    res.status(500).json({ msg: "Server error while hitting Train API" });
  }
});

module.exports = router;
