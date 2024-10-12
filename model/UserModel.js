const bcrypt = require("bcrypt");
const {pool} = require("../config/DbConnection");

// Create a new user
const createUser = async (username, email, password) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    return newUser.rows[0];  
  } catch (error) {
    throw new Error(error.message);
  }
};

// Find a user by email
const findUserByEmail = async (email) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return user.rows[0];  
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserByEmail,
};
