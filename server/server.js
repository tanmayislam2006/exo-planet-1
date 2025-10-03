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

const researcherRoutes = require("./routes/researcher")
const citizenRoutes = require("./routes/citizen");;


// Serve frontend (static)
app.use(express.static(path.join(__dirname, "../frontend")));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});
//citizenRoutes

app.use("/citizen", citizenRoutes);

//researcherRoutes
app.use("/researcher", researcherRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);




