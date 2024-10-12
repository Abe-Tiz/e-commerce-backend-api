const { pool } = require("../config/DbConnection");

const create = async (orderData) => {
  const { user_id, products, total_price, status } = orderData;
  const result = await pool.query(
    "INSERT INTO orders (user_id, products, total_price, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
    [user_id, JSON.stringify(products), total_price, status]
  );
  return result.rows[0];
};

const findByUserId = async (user_id) => {
  const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [
    user_id,
  ]);
  return result.rows;
};

const findOrderById = async (id) => {
  const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
  return result.rows[0];
};

module.exports = {
  create,
  findByUserId,
  findOrderById,
};
