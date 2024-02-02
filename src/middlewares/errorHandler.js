const prisma = require("../config/database");

const errorHandler = (err, req, res, next) => {
  if (err.code === "P2002") {
    // This error code means a unique constraint was violated (e.g. the product_id already exists)
    res
      .status(400)
      .json({ error: err.meta.target.join(" ") + " already exists" });
  } else {
    // For errors that we don't handle properly or don't know about
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = errorHandler;
