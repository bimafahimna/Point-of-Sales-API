const express = require("express");

const {
  createInventory,
  getInventories,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const router = express.Router();

router.post("/", createInventory);
router.get("/", getInventories);
router.get("/:product_id", getInventoryByProduct);
router.put("/:product_id", updateInventory);
router.delete("/:product_id", deleteInventory);

module.exports = router;
