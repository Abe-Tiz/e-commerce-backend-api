const { create } = require("../model/ProductModel");
const productSchema = require("../validation/ProductValidation");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const parsedData = productSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res
        .status(400)
        .json({ message: parsedData.error.errors[0].message });
    }
    const { name, description, price, stock, category } = parsedData.data;
    const newProduct = await create({ name, description, price, stock, category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

module.exports = {
  createProduct,
};
