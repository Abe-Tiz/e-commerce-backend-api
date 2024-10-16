const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
    // Bearer token
  const token = req.headers["authorization"]?.split(" ")[1]; 
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
    }
    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateUser;
