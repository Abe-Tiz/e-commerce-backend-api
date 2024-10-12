const { pool } = require("../config/DbConnection");

 const create = async (productData) => {
    const { name, description, price, stock, category } = productData;
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, stock, category]
    );
    return result.rows[0];
}
  
module.exports = {
  create,
};