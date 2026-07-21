const AuthService = require('@/services/AuthService');

const register = async (req, res, next) => {
  try {
    return await AuthService.register(req, res);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    return await AuthService.login(req, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};
