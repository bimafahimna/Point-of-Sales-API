const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { createInventory, getInventories, getInventoryByProduct, updateInventory, deleteInventory} = require("../controllers/inventoryController");
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const { addToCart, updateCartItem, deleteCartItem, getTotalPrice, submitOrder } = require("../controllers/cartController");
const { createTransaction, getTransactions, getTransactionDetails, updateTransaction, deleteTransaction} = require("../controllers/transactionController");


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.post("/", createInventory);
router.get("/", getInventories);
router.get("/:product_id", getInventoryByProduct);
router.put("/:product_id", updateInventory);
router.delete("/:product_id", deleteInventory);

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

router.post('/cart/add', addToCart);
router.put('/cart/update/:cartItemId', updateCartItem);
router.delete('/cart/delete/:cartItemId', deleteCartItem);
router.get('/cart/total', getTotalPrice);
router.post('/cart/submit', submitOrder);

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/:transactionCode', getTransactionDetails);
router.put('/transactions/:transactionCode', updateTransaction);
router.delete('/transactions/:transactionCode', deleteTransaction);

module.exports = router;