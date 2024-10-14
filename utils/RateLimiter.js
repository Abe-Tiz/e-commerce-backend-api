const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
  // 15 minutes wait to try login route if it fails to login after try 4 times
  windowMs: 15 * 60 * 1000,
  max: 4,
  message:
    "Too many login attempts from this IP, please try again after 15 minute.",
});

module.exports = loginRateLimiter;