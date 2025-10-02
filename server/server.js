const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const cors = require('cors');
// Load env
dotenv.config();

// Init app
const app = express();

// Middleware

app.use(cors({
    origin: "*"   
}));
app.use(express.json());
app.use(bodyParser.json());

// DB Connect
connectDB();

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Serve frontend (static)
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

//citizenRoutes
const citizenRoutes = require("./routes/citizen");
app.use("/citizen", citizenRoutes);

//researcherRoutes
const researcherRoutes = require("./routes/researcher");
app.use("/researcher", researcherRoutes);


