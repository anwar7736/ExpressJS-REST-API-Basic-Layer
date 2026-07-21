const express = require('express');
const { connectToRedis, getRedisClient } = require('@/config/redis');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('users/index', { title: 'Express MVC App' });
});

module.exports = router;
