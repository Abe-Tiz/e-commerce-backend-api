const request = require("supertest");
const app = require("../index");

let token;

beforeAll(() => {
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcyODg1MTg0OSwiZXhwIjoxNzI4ODU1NDQ5fQ.KBThA-OZiVWFWb7WKZUgjt4jtfhCzuRkNi9lCtARns8";
});

describe("Product API Endpoints", () => {
  it("POST /create - should create a product", async () => {
    const productData = {
      name: "Test Product",
      description: "A product for testing",
      price: 100,
      stock: 10,
      category: "Test Category",
    };

    const response = await request(app)
      .post("/product/create")
      .set("Authorization", `Bearer ${token}`)
      .send(productData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(productData.name);
  });

  // Test the product view (all products) endpoint
  it("GET /view - should return all products", async () => {
    const response = await request(app)
      .get("/product/view")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test the view a single product by ID endpoint
  it("GET /view/:id - should return a product by ID", async () => {
    const productId = 6;

    const response = await request(app)
      .get(`/product/view/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", productId);
  });

  // Test the product update endpoint
  it("PUT /update/:id - should update a product", async () => {
    const productId = 6;
    const updatedData = {
      name: " Product",
      description: "Updated description",
      price: 150,
      stock: 5,
      category: "Updated Category",
    };

    const response = await request(app)
      .put(`/product/update/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  // Test the product delete endpoint
  it("DELETE /delete/:id - should delete a product", async () => {
    const productId = 5;

    const response = await request(app)
      .delete(`/product/delete/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });

  // Test unauthorized access (missing token)
  it("GET /view - should return 401 if no token is provided", async () => {
    const response = await request(app).get("/product/view");
    expect(response.statusCode).toBe(401);
  });
});

afterAll((done) => {
  done();
});
