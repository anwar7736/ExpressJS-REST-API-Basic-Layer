const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('users/index', { title: 'Express MVC App' });
});

module.exports = router;
