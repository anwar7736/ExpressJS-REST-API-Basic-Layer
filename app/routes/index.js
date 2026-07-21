const express = require('express');
const apiRoutes = require('@/routes/api');
const webRoutes = require('@/routes/web');
const emailQueue = require("@/queues/emailQueue");
const router = express.Router();
const users = require('@/users.json');
const bookTitle = "The Psychology of Money"

router.get("/notify-all", async (req, res) => {

  for (const user of users) {
    await emailQueue.add("new-release", {
      to: user.email,
      subject: `📢 New Book Released: ${bookTitle}`,
      html: `<p>Hey! Check out our new book: <strong>${bookTitle}</strong>.</p>`,
    });
  }

  res.json({ message: `Queued ${users.length} emails for sending.` });
});

router.use('/api', apiRoutes);
router.use('/', webRoutes);

module.exports = router;
