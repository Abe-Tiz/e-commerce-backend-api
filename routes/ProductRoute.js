const express = require("express");
const { createProduct, getProducts, getProductById, updateProduct, deleteProducts } = require("../controller/ProductController");
const { checkAbility } = require("../middleware/Authorize");
const authenticateUser = require("../middleware/AuthMiddleware");



const router = express.Router();

router.post(
  "/create",
    authenticateUser,
    checkAbility('create', 'Product'),
  createProduct
);

router.get(
  "/view",
  authenticateUser,
  checkAbility("read", "Product"),
  getProducts
);

router.get(
  "/view/:id",
  authenticateUser,
  checkAbility("read", "Product"),
  getProductById
);

router.put(
  "/update/:id",
  authenticateUser,
  checkAbility("update", "Product"),
  updateProduct
);

router.delete(
  "/delete/:id",
  authenticateUser,
  checkAbility("delete", "Product"),
  deleteProducts
);

module.exports = router;
