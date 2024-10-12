const { pool } = require("../config/DbConnection");

const create = async (productData) => {
  const { name, description, price, stock, category } = productData;
  const result = await pool.query(
    "INSERT INTO products (name, description, price, stock, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, price, stock, category]
  );
  return result.rows[0];
};

// display all products
const findAll = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

// find by id
const findById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

// update products
 const update = async (id, productData) => {
    const { name, description, price, stock, category } = productData;
    const result = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5 WHERE id = $6 RETURNING *",
      [name, description, price, stock, category, id]
    );
    return result.rows[0];
}

 const deleteProduct = async (id) => {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
     if (result.rows.length === 0) {
       return { message: "Product not found" };
     }
     return {
       message: "Product successfully deleted",
       product: result.rows[0],
     };
}
  
  // Update stock method
  const updateStock = async (productId, quantityChange) => {
    const result = await pool.query(
      'UPDATE products SET stock = stock + $1 WHERE id = $2 RETURNING *',
      [quantityChange, productId]
    );
    return result.rows[0];  
  }
  
    module.exports = {
      create,
      findAll,
      findById,
      update,
      deleteProduct,
      updateStock,
    };
