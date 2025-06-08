const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /address/:id - Add an address for user with id=:id
router.post('/address/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { address, landmark, state, pincode } = req.body;

  if (!userId || !address) {
    return res.status(400).json({ message: "User ID and address are required." });
  }

  try {
    const newAddress = await prisma.address.create({
      data: {
        userId,
        address,
        landmark: landmark || '',
        state: state || '',
        pincode: pincode || '',
      },
    });

    res.status(201).json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error('Error inserting address:', error);
    res.status(500).json({ message: "Failed to insert address" });
  }
});

// GET /address/:id - Get all addresses for a user
router.get('/address/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    if (addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found for this user." });
    }

    res.status(200).json({ addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});

module.exports = router;
