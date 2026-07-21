const express = require('express');
const router = express.Router();
const authMiddleware = require('@/middlewares/AuthMiddleware');
const userController = require('@/controllers/UserController');

router.get('/', authMiddleware.auth, userController.getAllUsers);
router.get('/export/excel', authMiddleware.auth, userController.exportUsersExcel);
router.get('/export/pdf', authMiddleware.auth, userController.exportUsersPdf);
router.post('/', authMiddleware.auth, userController.storeUser);
router.put('/:id', authMiddleware.auth, userController.updateUser);
router.delete('/:id', authMiddleware.auth, userController.deleteUser);
router.get('/:id', authMiddleware.auth, userController.getUserById);

module.exports = router;