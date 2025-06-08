// routes/products.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: All kitchen accessories
router.get('/kitchenary', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { category: 'kitchen-accessories' },
      orderBy: { id: 'desc' },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching kitchenary products:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: Limited kitchen items for homepage
router.get('/kitchen', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const products = await prisma.product.findMany({
      where: { category: 'kitchen-accessories' },
      take: limit,
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching kitchen items:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: Limited mobile items for homepage
router.get('/mob', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const products = await prisma.product.findMany({
      where: { category: 'mobile-accessories' },
      take: limit,
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching mobile items:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: All mobile accessories
router.get('/mobiles', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { category: 'mobile-accessories' },
      orderBy: { id: 'desc' },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching mobile products:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: All groceries
router.get('/groceries', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { category: 'groceries' },
      orderBy: { id: 'desc' },
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching groceries:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: Distinct categories with one thumbnail each
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.$queryRaw`
      SELECT DISTINCT ON (category) category, thumbnail
      FROM "Product"
      ORDER BY category, random()
    `;
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: Products by category
router.get('/categories/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await prisma.product.findMany({
      where: { category },
    });
    res.json({ products });
  } catch (err) {
    console.error("Error fetching category products:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET: Search by title or category
router.get('/product/search', async (req, res) => {
  try {
    const { title, category } = req.query;

    const filters = {};
    if (title) {
      filters.title = { contains: title, mode: 'insensitive' };
    }
    if (category) {
      filters.category = { equals: category, mode: 'insensitive' };
    }

    const products = await prisma.product.findMany({
      where: filters,
    });

    res.json({ products });
  } catch (err) {
    console.error("Error searching products:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
