const { rateLimit } = require('express-rate-limit');

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per windowMs
	message: 'Too many requests. Please try again later.' // Error text
});

module.exports = {
	rateLimiter
}
