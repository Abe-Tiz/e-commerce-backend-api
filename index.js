
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { checkConnection } = require("./config/DbConnection");
dotenv.config();
const port = process.env.PORT;

const userRoutes = require("./routes/UserRoute")
const productRoutes = require("./routes/ProductRoute");

const app = express();
app.use(cors());
app.use(express.json());

checkConnection();

app.use("/user", userRoutes);
app.use("/product", productRoutes);


app.listen(port, () => {
  console.log(`server running on port ${port}`);
});