const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const { User } = require("../models");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");

const fallbackUsers = [
  {
    id: "demo-admin",
    firstName: "Admin",
    lastName: "User",
    email: "admin@attendance.com",
    password: bcrypt.hashSync("password123", 10),
    role: "Admin",
    isVerified: true
  },
  {
    id: "demo-lecturer",
    firstName: "Jane",
    lastName: "Smith",
    email: "lecturer@attendance.com",
    password: bcrypt.hashSync("password123", 10),
    role: "Lecturer",
    isVerified: true
  },
  {
    id: "demo-student",
    firstName: "John",
    lastName: "Doe",
    email: "student@attendance.com",
    password: bcrypt.hashSync("password123", 10),
    role: "Student",
    isVerified: true
  }
];

async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) return user;
  } catch (err) {
    console.error("findUserByEmail DB error:", err.message);
  }
  return fallbackUsers.find((u) => u.email === email) || null;
}

async function saveUser(userData) {
  try {
    return await User.create(userData);
  } catch (err) {
    console.error("saveUser DB error:", err.message);
    const newUser = { ...userData, id: `fb-${Date.now()}`, isVerified: false };
    fallbackUsers.push(newUser);
    return newUser;
  }
}

// ── LOGIN ──
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified) {
    return res.status(403).json({
      message: "Please verify your email first",
      needsVerification: true,
      email
    });
  }

  return res.json({
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    token: generateToken(user.id)
  });
});

// ── REGISTER ──
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await saveUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "Student",
      isVerified: false,
      otp,
      otpExpiresAt
    });

    // Send OTP email (non-blocking)
    const emailSent = await sendEmail({
      to: email,
      subject: "Verify your email — Attendance System",
      text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Thank you for registering. Use the OTP below to verify your email:</p>
          <div style="font-size: 2rem; font-weight: bold; letter-spacing: 8px; text-align: center; background: #f0f0f0; padding: 1rem; border-radius: 8px;">
            ${otp}
          </div>
          <p style="color: #666;">This OTP expires in 10 minutes.</p>
          <hr />
          <p style="color: #999; font-size: 0.8rem;">Attendance Management System</p>
        </div>
      `
    });

    if (!emailSent) {
      return res.status(201).json({
        message: "Registered but email sending failed. Use fallback OTP.",
        email,
        fallbackOtp: otp,
        needsVerification: true
      });
    }

    return res.status(201).json({
      message: "Registration successful. Please check your email for OTP.",
      email,
      needsVerification: true
    });
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ── VERIFY OTP ──
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ message: "OTP must be 6 digits" });
    }

    // Try DB first
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isVerified) {
        return res.json({
          message: "Already verified",
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          token: generateToken(user.id)
        });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      if (new Date() > new Date(user.otpExpiresAt)) {
        return res.status(400).json({ message: "OTP expired. Please register again." });
      }

      user.isVerified = true;
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();

      return res.json({
        message: "Email verified successfully",
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        token: generateToken(user.id)
      });
    } catch (err) {
      console.error("verifyOTP DB error:", err.message);
    }

    // Fallback mode: verify against fallbackUsers with proper OTP check
    const fallbackUser = fallbackUsers.find((u) => u.email === email);
    if (!fallbackUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fallbackUser.isVerified) {
      return res.json({
        message: "Already verified",
        _id: fallbackUser.id,
        firstName: fallbackUser.firstName,
        lastName: fallbackUser.lastName,
        email: fallbackUser.email,
        role: fallbackUser.role,
        token: generateToken(fallbackUser.id)
      });
    }

    // In fallback mode, verify the OTP that was stored during registration
    if (fallbackUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (fallbackUser.otpExpiresAt && new Date() > new Date(fallbackUser.otpExpiresAt)) {
      return res.status(400).json({ message: "OTP expired. Please register again." });
    }

    fallbackUser.isVerified = true;
    fallbackUser.otp = null;
    fallbackUser.otpExpiresAt = null;

    return res.json({
      message: "Email verified (fallback mode)",
      _id: fallbackUser.id,
      firstName: fallbackUser.firstName,
      lastName: fallbackUser.lastName,
      email: fallbackUser.email,
      role: fallbackUser.role,
      token: generateToken(fallbackUser.id)
    });
  } catch (error) {
    console.error("verifyOTP error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

// ── RESEND OTP ──
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists in DB
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.isVerified) {
        return res.status(400).json({ message: "User is already verified" });
      }

      const otp = generateOTP();
      const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otpExpiresAt = otpExpiresAt;
      await user.save();

      await sendEmail({
        to: email,
        subject: "New OTP — Attendance System",
        text: `Your new OTP is: ${otp}. It expires in 10 minutes.`
      });

      return res.json({ message: "OTP resent" });
    } catch (err) {
      // DB unavailable — check fallback
      console.error("resendOTP DB error:", err.message);
    }

    // Fallback mode
    const fallbackUser = fallbackUsers.find((u) => u.email === email);
    if (!fallbackUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fallbackUser.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    fallbackUser.otp = otp;
    fallbackUser.otpExpiresAt = otpExpiresAt;

    await sendEmail({
      to: email,
      subject: "New OTP — Attendance System",
      text: `Your new OTP is: ${otp}. It expires in 10 minutes.`
    });

    return res.json({ message: "OTP resent", fallbackOtp: otp });
  } catch (error) {
    console.error("resendOTP error:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
