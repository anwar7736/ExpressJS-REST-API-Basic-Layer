const jwt = require('jsonwebtoken');
const UserRepository = require('@/repositories/UserRepository');
const ResponseUtil = require('@/utils/ResponseUtil');
const { authLoginSchema, userStoreSchema } = require('@/requests/schemas');
const bcrypt = require('bcryptjs');
const { processImage } = require('@/middlewares/upload');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const generateToken = (user) => jwt.sign({ sub: user._id || user.id, role: user.role || 'user' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

const formatValidationErrors = (error) => {
  const formattedErrors = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0] || 'field';
    formattedErrors[field] = issue.message;
  });

  return formattedErrors;
};

module.exports = {
  register: async (req, res) => {
    const validation = userStoreSchema.safeParse(req.body || {});
    if (!validation.success) {
      return ResponseUtil.validation(res, formatValidationErrors(validation.error));
    }

    const { name, email, password } = validation.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    let avatarPath = null;

    if (req.file) {
      avatarPath = await processImage(req.file.path);
    }
    // const existingUser = await UserRepository.findByEmail(email);
    // if (existingUser) {
    //   return ResponseUtil.error(res, 'User already exists', 409);
    // }

    // const user = await UserRepository.create({ name, email, password });
    const user = {
        name,
        email,
        hashedPassword,
        avatar: avatarPath
    }
    const token = generateToken(user);

    return ResponseUtil.success(res, { user, token }, 201, 'Registration success.');
  },

  login: async (req, res) => {
    const validation = authLoginSchema.safeParse(req.body || {});
    if (!validation.success) {
      return ResponseUtil.validation(res, formatValidationErrors(validation.error));
    }

    const { email, password } = validation.data;
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return ResponseUtil.error(res, 'Invalid credentials', 401);
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return ResponseUtil.error(res, 'Invalid credentials', 401);
    }

    const payloadUser = user.toObject();
    delete payloadUser.password;
    const token = generateToken(payloadUser);

    return ResponseUtil.success(res, { user: payloadUser, token }, 200, 'Login success.');
  }
};
