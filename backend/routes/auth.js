// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import genToken from "../utils/genToken.js";

const router = express.Router();

// @route POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // create token
    const token = genToken(user._id);

    // send token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = genToken(user._id);

    // res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     sameSite: "lax",
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 30 * 24 * 60 * 60 * 1000,
    //   })
    //   .json({
    //     message: "Logged in successfully",
    //     user: { id: user._id, name: user.name, email: user.email },
    //   });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/auth/logout
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ message: "Logged out successfully" });
});

export default router;
