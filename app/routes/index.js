const express = require('express');
const apiRoutes = require('@/routes/api');
const webRoutes = require('@/routes/web');

const router = express.Router();

router.use('/api', apiRoutes);
router.use('/', webRoutes);

module.exports = router;
