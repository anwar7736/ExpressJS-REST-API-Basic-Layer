const express = require('express');
const userRoutes = require('@/routes/users');
const authRoutes = require('@/routes/auth');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'node-express-backend' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
