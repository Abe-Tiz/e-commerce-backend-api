const express = require("express");
const { createProduct } = require("../controller/ProductController");


const router = express.Router();

router.post("/create", createProduct);
// router.post("/login", login);

module.exports = router;
