const UserService = require('../services/UserService');

const getAllUsers = async (req, res, next) => {
  try {
    return await UserService.fetch(req, res);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    return await UserService.fetchById(req, res, id);
  } catch (error) {
    next(error);
  }
};

const storeUser = async (req, res, next) => {
  try {
    return await UserService.store(req, res);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    return await UserService.update(req, res, id);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    return await UserService.delete(req, res, id);
  } catch (error) {
    next(error);
  }
};

const exportUsersExcel = async (req, res, next) => {
  try {
    return await UserService.exportExcel(req, res);
  } catch (error) {
    next(error);
  }
};

const exportUsersPdf = async (req, res, next) => {
  try {
    return await UserService.exportPdf(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  storeUser,
  updateUser,
  deleteUser,
  exportUsersExcel,
  exportUsersPdf
};