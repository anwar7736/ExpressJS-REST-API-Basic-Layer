require('module-alias/register');
const createApp = require('@/app');

const app = createApp();
const port = Number(process.env.APP_PORT || 3000);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

