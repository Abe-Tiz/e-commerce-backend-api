const request = require("supertest");
const app = require("../index");

describe("User API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/user/register")
      .send({
        username: "testuser",
        email: "test12@gmail.com",
        password: "password123",
        role: "admin"
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  it("should login an existing user", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({
        email: "test12@gmail.com",
        password: "password123"
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body).toHaveProperty("token");
  });
});
