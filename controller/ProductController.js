const { client, invalidateCache } = require("../caching/Catche");
const logger = require("../logging/Logger");
const {
  create,
  findAll,
  findById,
  update,
  deleteProduct,
} = require("../model/ProductModel");
const productSchema = require("../validation/ProductValidation");

const CACHE_KEY = "product_List";

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
    const newProduct = await create({
      name,
      description,
      price,
      stock,
      category,
    });
    logger.info(`User Add Product data: ${JSON.stringify(newProduct)}`);
    res.status(201).json({success:true,newProduct});
    invalidateCache(CACHE_KEY);
  } catch (error) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

// Get all products

const getProducts = async (req, res) => {
  try {
    const cachedProducts = await client.get(CACHE_KEY);
    if (cachedProducts) {
      const products = JSON.parse(cachedProducts); 
      return res.status(200).json({"success redis": true,products});  
    }
    const products = await findAll();
    if (products.length === 0) {
      return res.status(200).json({ message: "No records found" });
    }
    await client.set(CACHE_KEY, JSON.stringify(products), "EX", 60);
    res.status(200).json({ success: true, products });
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
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({success:true,product});
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
      return res.status(404).json({ message: "Product not found" });
    }
    logger.info(`User Update Product data: ${JSON.stringify(product)}`);
    res.status(200).json({success:true,product});
    invalidateCache(CACHE_KEY);
  } catch (error) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

// Delete a product
const deleteProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteProduct(id);

    if (!result.product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({success:true,result});
    logger.info(`User Delete Product data: ${JSON.stringify(result.product)}`);
    invalidateCache(CACHE_KEY);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.status(200).json({
    message: "File uploaded successfully",
    filePath: req.file.path, 
  });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProducts,
  uploadImage,
};
