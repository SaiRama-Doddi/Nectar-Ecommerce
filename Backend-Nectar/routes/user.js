const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

// OTP generator
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Create user
router.post('/createUser', async (req, res) => {
  const { name, email, mobile, address, landmark, state, pincode, usertype } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        address,
        landmark,
        state,
        pincode,
        usertype: usertype || 'user',
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: 'desc' },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  try {
    await prisma.otpCode.create({
      data: {
        email,
        code: otp,
        expires_at: expiresAt,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your Nectar login OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, code } = req.body;
  try {
    const otpEntry = await prisma.otpCode.findFirst({
      where: {
        email,
        code,
        expires_at: { gt: new Date() },
      },
      orderBy: { id: 'desc' },
    });

    if (!otpEntry) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "OTP verified", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all addresses for a user
router.get('/addresses/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: parseInt(userId) },
    });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching addresses' });
  }
});

// Add new address
router.post('/addresses', async (req, res) => {
  const { userId, address, landmark, state, pincode } = req.body;
  try {
    const newAddress = await prisma.address.create({
      data: {
        userId: parseInt(userId),
        address,
        landmark,
        state,
        pincode,
      },
    });
    res.status(201).json(newAddress);
  } catch (err) {
    res.status(500).json({ message: 'Error adding address' });
  }
});

module.exports = router;
