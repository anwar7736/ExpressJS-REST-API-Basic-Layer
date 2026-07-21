const { Worker } = require("bullmq");
const Redis = require("ioredis");
const nodemailer = require("nodemailer");

const connection = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,
});

var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Limit to 100 emails/min = 1 email every 600ms
const delay = 600;

const worker = new Worker(
  "emailQueue",
  async (job) => {
    try {
      const { to, subject, html } = job.data;

      console.log("Processing job:", job.id);
      console.log(job.data);

      const info = await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        html,
      });

      console.log("Email sent:", info.messageId);
      console.log(info);

      await new Promise((res) => setTimeout(res, delay));
    } catch (err) {
      console.error("Send mail failed:", err);
      throw err; // BullMQ যাতে job-টিকে failed হিসেবে mark করে
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});