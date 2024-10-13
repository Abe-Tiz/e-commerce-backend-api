
const redis = require("redis");

const redisClient = redis.createClient({
  url: "redis://127.0.0.1:6379",
  socket: {
    connectTimeout: 5000,
  },
});

redisClient.connect().catch((err) => {
  console.error("Redis connection error:", err);
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;
