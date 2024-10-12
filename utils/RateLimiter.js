const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,
  max: 4,
  message:
    "Too many login attempts from this IP, please try again after 15 minute.",
});

module.exports = loginRateLimiter;