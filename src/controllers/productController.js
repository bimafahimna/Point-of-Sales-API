const prisma = require("../config/database");

const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        image,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    // Prisma built-in pagination
    const { page, limit } = req.query; // custom query for pagination when the products are too many (e.g. /api/products?page=2&limit=10)
    const pageNumber = parseInt(page) || 1; // default page number is 1
    const pageSize = limit ? parseInt(limit) : Infinity; // default page size is Infinity (all products)
    const skip = (pageNumber - 1) * (isFinite(pageSize) ? pageSize : 0); // skip is the number of products to skip (e.g. page 2 should skip the first 10 products)
    const take = isFinite(pageSize) ? pageSize : undefined;

    const products = await prisma.product.findMany({
      skip,
      take,
    });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        product_id: parseInt(id),
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  try {
    const product = await prisma.product.update({
      where: {
        product_id: parseInt(id),
      },
      data: {
        name,
        price,
        image,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.delete({
      where: {
        product_id: parseInt(id),
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
