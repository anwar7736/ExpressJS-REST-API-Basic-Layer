const runUserCleanup = async () => {
  console.info('[cron] user cleanup check executed');
  return { status: 'ok' };
};

module.exports = {
  runUserCleanup
};
