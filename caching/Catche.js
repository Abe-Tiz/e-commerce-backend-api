const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();
const client = redis.createClient({ url: process.env.REDIS_URL });

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client
  .connect()
  .then(() => console.log("Redis client successfully connected to the server"))
  .catch((err) => console.error("Redis connection error:", err));

// Invalidate product list cache
const invalidateCache = (key) => {
  client.del(key, (err, response) => {
    if (err) {
      console.error("Failed to invalidate cache:", err);
    } else if (response === 1) {
      console.log("Cache invalidated");
    } else {
      console.log("Cache not found");
    }
  });
};

module.exports = {
  invalidateCache,
  client,
};
