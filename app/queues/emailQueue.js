const { Queue } = require("bullmq");
const Redis = require("ioredis");
const nodemailer = require("nodemailer");

const connection = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,
});

const emailQueue = new Queue("emailQueue", {
 connection,
 defaultJobOptions: {
 removeOnComplete: true,
 removeOnFail: true,
 },
});
module.exports = emailQueue; 

