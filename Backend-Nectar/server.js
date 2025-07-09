require('dotenv').config();
const { Pool } = require('pg');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'https://nectar-ecommerce.vercel.app'],
  credentials: true
}));



// PostgreSQL Pool (if you still need it somewhere else)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Adjust based on your environment
  },
});

// Prisma client instance
const prisma = new PrismaClient();



const addedproductRoutes=require('./routes/addedproducts');
app.use('/p', addedproductRoutes);

const userRoutes = require('./routes/user');
app.use('/u', userRoutes);

const userAddressRoutes = require('./routes/useraddress');
app.use('/ua', userAddressRoutes);

const productRoutes = require('./routes/fetchproducts');
app.use('/products', productRoutes);

const orderRoutes = require('./routes/order');
app.use('/order', orderRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
