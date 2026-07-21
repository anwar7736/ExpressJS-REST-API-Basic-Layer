const Redis = require("ioredis");

let client;

const connectToRedis = async () => {
  if (client) {
    return client;
  }

  try {
    client = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

    client.on("connect", () => {
      console.log("✅ Redis Connected");
    });

    client.on("error", (err) => {
      console.error("Redis Error:", err);
    });

    return client;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getRedisClient = () => client;

module.exports = {
  connectToRedis,
  getRedisClient,
};