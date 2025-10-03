const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require('form-data'); // ADD THIS LINE
const router = express.Router();

// Use memory storage for file handling
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

/**
 * KOI JSON Input → External API এ হিট
 */
router.post("/input", async (req, res) => {
  try {
    const koiData = req.body;
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

/**
 * CSV Upload → External API এ হিট with PROPER multipart/form-data
 */
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "No file uploaded",
      });
    }
    // Create FormData for multipart/form-data request (CORRECT APPROACH)
    const formData = new FormData();
    
    // Append the file buffer with original filename and content type
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname || 'data.csv',
      contentType: req.file.mimetype || 'text/csv'
    });

    // Send as multipart/form-data (CORRECT WAY)
    const response = await axios.post(
      "http://13.200.246.18:8000/predict_csv", 
      formData,
      {
        headers: {
          ...formData.getHeaders(), // This sets Content-Type with boundary automatically
        },
        maxContentLength: 50 * 1024 * 1024,
        // Axios will handle Content-Length automatically for FormData
      }
    );

    // Handle the response based on content type
    const contentType = response.headers['content-type'] || '';

    if (contentType.includes('application/json')) {
      // JSON response
      return res.json({
        success: true,
        data: response.data
      });
    } else if (contentType.includes('text/csv') || typeof response.data === 'string') {
      // CSV response - send as file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="prediction_results.csv"');
      return res.send(response.data);
    } else {
      // Binary or other response
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename="results.bin"');
      return res.send(response.data);
    }

  } catch (err) {
    console.error("CSV Upload API Error:", err.message);

    // Handle different error types
    if (err.response) {
      console.error("External API response error:", err.response.status);
      console.error("External API error data:", JSON.stringify(err.response.data, null, 2));

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
      console.error("Network error details:", {
        method: err.request.method,
        url: err.request.url,
        headers: err.request.headers
      });
      return res.status(503).json({
        success: false,
        msg: "Cannot connect to external API service",
        error: err.message
      });
    } else {
      // Other errors
      return res.status(500).json({
        success: false,
        msg: "Server error while processing file",
        error: err.message
      });
    }
  }
});

/**
 * Train AI Model → External API এ হিট
 */
router.post("/train", upload.single("file"), async (req, res) => {
  console.log("Train endpoint hit");
  try {
    if (!req.file) return res.status(400).json({ msg: "CSV file required" });

    const { learning_rate, n_estimators, test_size } = req.body;

    // Since we're using memory storage, create a temporary file
    const tempPath = path.join(__dirname, '../uploads', `temp_${Date.now()}.csv`);
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    fs.writeFileSync(tempPath, req.file.buffer);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(tempPath));
    formData.append("learning_rate", learning_rate);
    formData.append("n_estimators", n_estimators);
    formData.append("test_size", test_size);

    const response = await axios.post(
      "http://13.200.246.18:8000/train",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    // Clean up temp file
    fs.unlinkSync(tempPath);

    // Create output file
    const outputPath = path.join(__dirname, "../uploads", "trained_model_result.csv");
    fs.writeFileSync(outputPath, response.data);

    res.download(outputPath, "trained_model_results.csv", (err) => {
      if (err) {
        console.error("Download error:", err);
      }
      // Clean up output file after download
      setTimeout(() => {
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }
      }, 5000);
    });

  } catch (err) {
    console.error("Train API Error:", err.message);
    res.status(500).json({ msg: "Server error while hitting Train API" });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        msg: 'File too large. Maximum size is 10MB.',
      });
    }
  }
  
  if (error.message === 'Only CSV files are allowed') {
    return res.status(400).json({
      success: false,
      msg: 'Only CSV files are allowed',
    });
  }
  
  next(error);
});

module.exports = router;