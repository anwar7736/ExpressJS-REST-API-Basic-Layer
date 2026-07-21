const express = require('express');
const router = express.Router();
const authController = require('@/controllers/AuthController');
const { upload } = require('@/middlewares/upload');

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);

module.exports = router;
