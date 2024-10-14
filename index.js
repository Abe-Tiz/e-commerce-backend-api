const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const { checkConnection } = require("./config/DbConnection");
dotenv.config();
const port = process.env.PORT;
const userRoutes = require("./routes/UserRoute");
const productRoutes = require("./routes/ProductRoute");
const orderRoutes = require("./routes/OrderRoute");
const loggeRoutes = require("./routes/LoggeRoute");
const requestLogger = require("./middleware/RequestLogging");
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// database connection
checkConnection();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/logge", loggeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
