const express = require('express');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const inventoryRoutes = require('./inventoryRoutes');

const router = express.Router();

// Auth routes
router.use('/auth', authRoutes);
// Product routes
router.use('/products', productRoutes);
// Inventory routes
router.use('/inventories', inventoryRoutes);

module.exports = router;
``