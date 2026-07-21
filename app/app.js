require('module-alias/register');
const express = require('express');
const path = require('path');
const routes = require('@/routes');
const notFoundHandler = require('@/middlewares/notFoundHandler');
const errorHandler = require('@/middlewares/errorHandler');
const { connectToDatabase } = require('@/config/db');
const { connectToRedis } = require('@/config/redis');

module.exports = function createApp() {
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'node-express-backend' });
  });

  connectToDatabase().catch((error) => {
    console.error('Database connection failed', error);
  });

  connectToRedis().catch((error) => {
    console.error('Redis connection failed', error);
  });

  app.use(routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
