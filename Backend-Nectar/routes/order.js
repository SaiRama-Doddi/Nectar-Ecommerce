const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order and save to DB
router.post("/create-razorpay-order", async (req, res) => {
  try {
    const { amount, productId, userId, addressId } = req.body;

    // Fetch product info
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    // Create order in Razorpay
    const razorOrder = await razorpay.orders.create({
      amount: amount * 100, // INR to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Save order in DB
    const newOrder = await prisma.order.create({
      data: {
        productId,
        userId,
        addressId,
        title: product.title,
        description: product.description,
        price: amount, // in INR
        thumbnail: product.thumbnail,
      },
    });

    res.json({ razorpayOrder: razorOrder, orderRecord: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
});


module.exports = router;