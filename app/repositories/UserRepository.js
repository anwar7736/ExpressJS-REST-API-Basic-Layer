const User = require('@/models/User');
const users = require('@/users.json');
class UserRepository {
  async findAll() {
    // return User.find({}).select('-password').lean();
    return users;
  }

  async findById(id) {
    return User.findById(id).select('-password').lean();
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async create(data) {
    const user = await User.create(data);
    const plainUser = user.toObject();
    delete plainUser.password;
    return plainUser;
  }

  async update(id, data) {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updatedUser) {
      return null;
    }

    const plainUser = updatedUser.toObject();
    delete plainUser.password;
    return plainUser;
  }

  async delete(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    return !!deletedUser;
  }
}

module.exports = new UserRepository();