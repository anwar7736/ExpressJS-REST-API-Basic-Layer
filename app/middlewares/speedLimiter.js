const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 15 minutes
  delayAfter: 3, // Start slowing down after 50 requests
	delayMs: (hits) => hits * 200, // Add 200 ms of delay to every request after the 5th one.
});

module.exports = {
  speedLimiter
}