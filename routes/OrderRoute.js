const express = require("express");
const { placeOrder, getOrders, getOrderById } = require("../controller/OrderController");
const authenticateUser = require("../middleware/AuthMiddleware");
const { checkAbility } = require("../middleware/Authorize");

const router = express.Router();

router.post(
  "/place-order",
  authenticateUser,
  checkAbility("create", "Order"),
  placeOrder
);

router.get(
  "/view-orders",
  authenticateUser,
  getOrders
);

router.get("/view-orders/:id", authenticateUser, getOrderById);

module.exports = router;
