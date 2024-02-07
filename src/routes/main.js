const express = require("express");
const {
  register,
  login,
  logout,
  changePassword,
  updateAccount,
} = require("../controllers/authController");
const {
  getEmployees,
  getEmployeeByUsername,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");
const {
  createInventory,
  getInventories,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const {
  addToCart,
  updateCartItem,
  deleteCartItem,
  getTotalPrice,
  submitOrder,
} = require("../controllers/cartController");
const {
  createTransaction,
  getTransactions,
  getTransactionDetails,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const {
  createDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/discountController");

const { getCheckOut } = require("../controllers/checkoutController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/change-password", changePassword);
router.put("/update-account", updateAccount);

router.get("/employees", getEmployees);
router.get("/employees/:username", getEmployeeByUsername);
router.put("/employees/:username", updateEmployee);
router.delete("/employees/:username", deleteEmployee);

router.post("/inventories/", createInventory);
router.get("/inventories/", getInventories);
router.get("/inventories/:product_id", getInventoryByProduct);
router.put("/inventories/:product_id", updateInventory);
router.delete("/inventories/:product_id", deleteInventory);

router.post("/products/", createProduct);
router.get("/products/", getProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.post("/cart/add", addToCart);
router.put("/cart/update/:cartItemId", updateCartItem);
router.delete("/cart/delete/:cartItemId", deleteCartItem);
router.get("/cart/total", getTotalPrice);
router.post("/cart/submit", submitOrder);

router.post("/transactions", createTransaction);
router.get("/transactions", getTransactions);
router.get("/transactions/:transactionCode", getTransactionDetails);
router.put("/transactions/:transactionCode", updateTransaction);
router.delete("/transactions/:transactionCode", deleteTransaction);

router.post("/discounts", createDiscount);
router.get("/discounts", getDiscounts);
router.put("/discounts/:discount_id", updateDiscount);
router.delete("/discounts/:discount_id", deleteDiscount);

router.get("/checkout", getCheckOut);

module.exports = router;
