const { createClient } = require('redis');

let client;
let redisAvailable = false;

const connectToRedis = async () => {
  if (client) {
    return client;
  }

  try {
    client = createClient({
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
      socket: {
        connectTimeout: 500,
        lazyConnect: true
      }
    });

    client.on('error', () => {
      redisAvailable = false;
    });

    await client.connect();
    redisAvailable = true;
    return client;
  } catch (error) {
    redisAvailable = false;
    return null;
  }
};

const getRedisClient = () => (redisAvailable ? client : null);

module.exports = {
  connectToRedis,
  getRedisClient
};
