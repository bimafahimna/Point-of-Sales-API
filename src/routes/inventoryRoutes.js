const express = require("express");

const {
  createInventory,
  getInventories,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/inventories", createInventory);
router.get("/inventories", getInventories);
router.get("/inventories/:product_id", getInventoryByProduct);
router.put("/inventories/:product_id", updateInventory);
router.delete("/inventories/:product_id", deleteInventory);

module.exports = router;
