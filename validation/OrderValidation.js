const { z } = require("zod");

const orderSchema = z.object({
  products: z.array(
    z.object({
      product_id: z
        .number()
        .int()
        .nonnegative("Product ID must be a non-negative integer"),
      quantity: z
        .number()
        .int()
        .positive("Quantity must be a positive integer")
        .max(5, "Cannot order more than 10 of any product"),  
    })
  ),
  status: z.string().min(1, "Status is required"),
});


module.exports = { orderSchema };
