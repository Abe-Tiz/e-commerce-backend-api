// __tests__/orderController.test.js
const request = require("supertest");
const app = require("../index");
const { pool } = require("../config/DbConnection");

describe("Order API", () => {
  let token;

 beforeAll(() => {
   token =
     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6InVzZXIiLCJpYXQiOjE3Mjg4OTg3MjAsImV4cCI6MTcyODkxMzEyMH0.dxqm9BpevJb97aJYX9vQuG2OgnVjmsHyBn8J5YjTRCc";
 });
    
     afterAll(async () => {
       await pool.end();
     });


  it("should place a new order", async () => {
    // Place an order
    const response = await request(app)
      .post("/order/place-order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        products: [{ product_id: 6, quantity: 1 }],
        status: "pending",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(order);
  });

  it("should get all orders", async () => {
    const response = await request(app)
      .get("/order/view-orders")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a specific order by ID", async () => {
    const orderId = 6;
    const response = await request(app)
      .get(`/order/view-orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", orderId);
  });
});
