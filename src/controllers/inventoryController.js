const prisma = require('../config/database');

const createInventory = async (req, res, next) => {
  const { product_id, quantity_in_stock } = req.body;

  try {
    const inventory = await prisma.inventory.create({
      data: {
        product_id,
        quantity_in_stock,
      },
    });

    res.status(201).json(inventory);
  } catch (error) {
    next(error);
  }
};

const getInventories = async (req, res, next) => {
  try {
    // Prisma built-in pagination
    const { page, limit } = req.query; // custom query for pagination when the inventories are too many (e.g. /api/inventories?page=2&limit=10)
    const pageNumber = parseInt(page) || 1; // default page number is 1
    const pageSize = limit ? parseInt(limit) : Infinity; // default page size is Infinity (all inventories)
    const skip = (pageNumber - 1) * (isFinite(pageSize) ? pageSize : 0); // skip is the number of inventories to skip (e.g. page 2 should skip the first 10 inventories)
    const take = isFinite(pageSize) ? pageSize : undefined;

    const inventories = await prisma.inventory.findMany({
      skip,
      take,
    });

    res.status(200).json(inventories);
  } catch (error) {
    next(error);
  }
};

const getInventoryByProduct = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const inventory = await prisma.inventory.findUnique({
      where: { product_id: parseInt(product_id) },
    });

    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

const updateInventory = async (req, res, next) => {
  const { product_id } = req.params;
  const { quantity_in_stock } = req.body;

  try {
    const inventory = await prisma.inventory.update({
      where: { product_id: parseInt(product_id) },
      data: { quantity_in_stock },
    });

    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

const deleteInventory = async (req, res, next) => {
  const { product_id } = req.params;

  try {
    const inventory = await prisma.inventory.delete({
      where: { product_id: parseInt(product_id) },
    });

    res.status(200).json(inventory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInventory,
  getInventories,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
};
