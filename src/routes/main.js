const express = require('express');
const authController = require('../controllers/authController');
const productRoutes = require('./productRoutes');
const inventoryRoutes = require('./inventoryRoutes');

const router = express.Router();

// Register endpoint
router.post('/register', authController.register);
// Login endpoint
router.post('/login', authController.login);

// Product routes
router.use('/products', productRoutes);
// Inventory routes
router.use('/inventories', inventoryRoutes);

module.exports = router;
``