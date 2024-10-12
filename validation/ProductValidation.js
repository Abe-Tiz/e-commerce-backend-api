const { z } = require("zod");

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  category: z.string().min(1, "Category is required"),
});

module.exports = productSchema;
