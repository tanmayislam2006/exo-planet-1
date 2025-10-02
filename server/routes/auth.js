const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

/**
 *  PASSWORD UPDATE KORA
 */
router.post("/update-password", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Old password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: "Password updated successfully!" });
  } catch (err) {
    console.error("Password Update Error:", err.message);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "User registered successfully!" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ msg: "Server error: " + err.message });
  }
});

module.exports = router;
