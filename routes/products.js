const express = require("express");
const router = express.Router();
const { products, getNextId } = require("../data/products");
const { AppError } = require("../middleware/errorHandler");

// GET all products (supports ?fields=id,name for solving over-fetching)
router.get("/", (req, res) => {
  const { fields } = req.query;
  if (fields) {
    const selected = fields.split(",");
    const filtered = products.map((p) => {
      const obj = {};
      selected.forEach((f) => {
        if (p[f] !== undefined) obj[f] = p[f];
      });
      return obj;
    });
    return res.status(200).json({ success: true, data: filtered });
  }
  res.status(200).json({ success: true, data: products });
});

// GET single product
router.get("/:id", (req, res, next) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return next(new AppError("Product not found", 404));
  res.status(200).json({ success: true, data: product });
});

// POST create product
router.post("/", (req, res, next) => {
  const { name, price, category, stock } = req.body;
  if (!name || price === undefined) {
    return next(new AppError("Name and price are required", 400));
  }
  const newProduct = {
    id: getNextId(),
    name,
    price,
    category: category || "Uncategorized",
    stock: stock || 0,
  };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
});

// PUT update product (idempotent - full replace)
router.put("/:id", (req, res, next) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return next(new AppError("Product not found", 404));

  const { name, price, category, stock } = req.body;
  if (!name || price === undefined) {
    return next(new AppError("Name and price are required", 400));
  }

  products[index] = {
    id: products[index].id,
    name,
    price,
    category: category || "Uncategorized",
    stock: stock || 0,
  };
  res.status(200).json({ success: true, data: products[index] });
});

// DELETE product
router.delete("/:id", (req, res, next) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return next(new AppError("Product not found", 404));

  const deleted = products.splice(index, 1);
  res.status(200).json({ success: true, data: deleted[0] });
});

module.exports = router;