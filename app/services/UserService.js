const ResponseUtil = require('@/utils/ResponseUtil');
const UserRepository = require('@/repositories/UserRepository');
const { dispatchWelcomeEmail } = require('@/queues/UserWelcomeJob');
const { connectToRedis, getRedisClient } = require('@/config/redis');
const ExportUtil = require('@/utils/ExportUtil');

const getUserCacheKey = (req) => `users:${req.user?.sub || 'anonymous'}`;

module.exports = {
  fetch: async (req, res) => {
    const cacheKey = getUserCacheKey(req);

    try {
      const client = await connectToRedis();
      if (client) {
        const cachedUsers = await client.get(cacheKey);
        if (cachedUsers) {
          console.log("Cache Get");
          return ResponseUtil.success(res, JSON.parse(cachedUsers));
        }
      }
    } catch (error) {
      // fall back to MongoDB when Redis is unavailable
    }

    const users = await UserRepository.findAll();
    try {
      const client = getRedisClient();

      if (client) {
        await client.set(
          cacheKey,
          JSON.stringify(users),
          "EX",
          60
        );

        console.log("Cache saved successfully");
      } else {
        console.log("Redis client is null");
      }
    } catch (error) {
      console.error("Redis SET Error:", error);
    }

    return ResponseUtil.success(res, users);
  },

  fetchById: async (req, res, id) => {
    const parsedId = Number(id);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      return ResponseUtil.error(res, 'Invalid user id', 400);
    }

    const user = await UserRepository.findById(parsedId);

    if (!user) {
      return ResponseUtil.error(res, 'User not found', 404);
    }

    return ResponseUtil.success(res, user);
  },

  update: async (req, res, id) => {
    const data = req.body || {};
    const updatedUser = await UserRepository.update(id, data);

    if (!updatedUser) {
      return ResponseUtil.error(res, 'User not found', 404);
    }

    return ResponseUtil.success(res, updatedUser);
  },

  delete: async (req, res, id) => {
    const deleted = await UserRepository.delete(id);

    if (!deleted) {
      return ResponseUtil.error(res, 'User not found', 404);
    }

    const client = getRedisClient();
    if (client) {
      await client.del(getUserCacheKey(req));
    }

    return ResponseUtil.success(res, { deleted: true });
  },

  exportExcel: async (req, res) => {
    const users = await UserRepository.findAll();
    const buffer = await ExportUtil.buildExcel(users);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
    return res.send(buffer);
  },

  exportPdf: async (req, res) => {
    const users = await UserRepository.findAll();
    const buffer = await ExportUtil.buildPdf(users);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');
    return res.send(buffer);
  }
};