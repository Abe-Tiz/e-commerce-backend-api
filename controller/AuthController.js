const { findUserByEmail, createUser } = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginSchema } = require("../validation/UserValidation");
const loginRateLimiter = require("../utils/RateLimiter");
const logger = require("../logging/Logger");
require("dotenv").config();

// register user
const register = async (req, res) => {
  const { username, email, password,role } = req.body;
  try {
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = await createUser(username, email, password,role);
     logger.info(`User registered: ${JSON.stringify(username, email,role)}`); 
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message});
  }
};

// login
const login = async (req, res) => {
  const validationResult = loginSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res
      .status(400)
      .json({ message: validationResult.error.errors[0].message });
    }
  const { email, password } = validationResult.data;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
      }
      req.user = { id: user.id, role: user.role };

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );
     logger.info(
       `User Loggedin data: ${JSON.stringify({
         message: "Login successful",
         token,
       })}`
     ); 
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login: [loginRateLimiter, login] };