const { create, findAll, findById, update, deleteProduct } = require("../model/ProductModel");
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

// Get all products
const getProducts = async (req, res) => {
  try {
      const products = await findAll();
       if (products.length === 0) {
         return res.status(200).json({ message: "No records found" });
       }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product details
const updateProduct = async (req, res) => {
  try {
      const parsedData = productSchema.safeParse(req.body);
      const id = req.params.id;

    if (!parsedData.success) {
      return res
        .status(400)
        .json({ message: parsedData.error.errors[0].message });
      }
       const { name, description, price, stock, category } = parsedData.data;
    const product = await update(id, {
      name,
      description,
      price,
      stock,
      category,
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

// Delete a product
const deleteProducts = async (req, res) => {
    try {
    const id = req.params.id;
    const product = await deleteProduct(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).json({message:"deleted Successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProducts,
};
