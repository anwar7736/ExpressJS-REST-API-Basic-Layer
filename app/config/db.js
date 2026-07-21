const mongoose = require('mongoose');

const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/express-mvc';

  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  return mongoose.connect(uri, {
    autoIndex: true
  });
};

module.exports = {
  connectToDatabase
};
