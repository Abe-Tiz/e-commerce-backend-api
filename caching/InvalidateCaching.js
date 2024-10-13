const redisClient = require("./RedisClient");

const invalidateCache = (req, res, next) => {
  const cacheKey = "product_list";
  redisClient.del(cacheKey, (err) => {
    if (err) {
      console.error("Redis delete error:", err);
    }
    next();
  });
};

module.exports = { invalidateCache };