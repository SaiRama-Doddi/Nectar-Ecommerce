// routes-product.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /products - add a single product
router.post('/products', async (req, res) => {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
  } = req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Product with this title, category and brand already exists.' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// GET /api/insert - insert bulk products from dummyjson
router.get('/api/insert', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=98');
    const data = await response.json();

    for (const product of data.products) {
      await prisma.product.upsert({
        where: {
          title: product.title, // This requires title unique or composite unique, adjust if needed
        },
        update: {},
        create: {
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage ?? null,
          rating: product.rating ?? null,
          stock: product.stock,
          brand: product.brand ?? 'Unknown Brand',
          category: product.category,
          thumbnail: product.thumbnail ?? null,
        },
      });
    }
    res.status(200).json({ message: 'All products inserted or skipped if duplicate' });
  } catch (err) {
    console.error('Error inserting products:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/mobile-accessories - insert only mobile accessories products
router.get('/api/mobile-accessories', async (req, res) => {
  try {
    const response = await fetch('https://dummyjson.com/products/category/mobile-accessories');
    const data = await response.json();

    for (const product of data.products) {
      if (product.category === 'mobile-accessories') {
        if (!product.title || !product.brand || !product.category) continue;

        await prisma.product.upsert({
          where: {
            title_category_brand_unique: {
              title: product.title,
              category: product.category,
              brand: product.brand,
            },
          },
          update: {},
          create: {
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage ?? null,
            rating: product.rating ?? null,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail ?? null,
          },
        });
      }
    }
    res.status(200).json({ message: 'Mobile accessories inserted successfully (using Prisma)' });
  } catch (error) {
    console.error('Error fetching/inserting mobile accessories:', error);
    res.status(500).json({ error: 'Failed to fetch or insert mobile accessories' });
  }
});

module.exports = router;
