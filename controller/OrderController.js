const { pool } = require("../config/DbConnection");
const { create, findByUserId, findOrderById } = require("../model/OrderModel");
const { findById, updateStock } = require("../model/ProductModel");
const { orderSchema } = require("../validation/OrderValidation");

// Place an order
const placeOrder = async (req, res) => {
  const result = orderSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors[0].message });
  }

  const { products, status } = result.data;
  const user_id = req.user.id; 
  let total_price = 0;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Check stock levels and calculate total price
    for (const item of products) {
      const product = await findById(item.product_id);
      if (!product || product.stock < item.quantity) {
        await client.query("ROLLBACK");
        return res
          .status(400)
          .json({
            message: `Insufficient stock for product ID ${item.product_id}`,
          });
      }
      total_price += product.price * item.quantity;
      }
      
    const order = await create({ user_id, products, total_price, status });

    // Update product stock
    for (const item of products) {
      await updateStock(item.product_id, -item.quantity);
    }

    await client.query("COMMIT");
    res.status(201).json(order);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    client.release();
  }
};

// Get orders for the authenticated user
const getOrders = async (req, res) => {
  const user_id = req.user.id;  
  try {
    const orders = await findByUserId(user_id);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get details of a specific order
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await findOrderById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
};
