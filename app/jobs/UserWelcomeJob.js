const { sendWelcomeEmail } = require('@/mails/UserMail');

const dispatchWelcomeEmail = async (user) => {
  await sendWelcomeEmail(user);
  return { delivered: true, userId: user.id };
};

module.exports = {
  dispatchWelcomeEmail
};
