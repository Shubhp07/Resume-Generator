import express from "express";
import User from "../models/User.js";
import { googleLogin, loginUser } from "../controllers/authController.js";
import bcrypt from "bcryptjs";

const router = express.Router();
router.post("/login",loginUser);
router.post("/google", googleLogin);

// Simple register endpoint (no passwords here — intended as a lightweight stub)
router.post("/register", async (req, res) => {
  try {
    console.log("Register rwq body ", req.body);

    const { firstName, lastName, email, password, userType } = req.body;
    const name = `${firstName || ""} ${lastName || ""}`.trim();

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(200).json({ user });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password and isOAuth false
    user = new User({
      name: name || "",
      email: email.toLowerCase(),
      password: hashedPassword,
      isOAuth: false,
      userType: userType || "user",
    });

    await user.save();

    return res.status(201).json({ user });
  } catch (err) {
    console.error("auth/register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


export default router;
