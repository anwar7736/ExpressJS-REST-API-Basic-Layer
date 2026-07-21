const sendWelcomeEmail = async (user) => {
  console.info(`[mail] queueing welcome email for ${user.email}`);

  return {
    recipient: user.email,
    subject: 'Welcome to Express MVC',
    status: 'queued'
  };
};

module.exports = {
  sendWelcomeEmail
};
