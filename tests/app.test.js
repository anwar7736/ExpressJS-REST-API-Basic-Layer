const test = require('node:test');
const assert = require('node:assert/strict');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { connectToDatabase } = require('../app/config/db');
const createApp = require('../app/app');

let mongoServer;

test.before(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
  await connectToDatabase();
});

test.after(async () => {
  await require('mongoose').disconnect();
  await mongoServer.stop();
});

test('health endpoint returns status ok', async () => {
  const app = createApp();
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(body, {
      status: 'ok',
      service: 'node-express-backend'
    });
  } finally {
    server.close();
  }
});

test('register creates a user and returns a jwt', async () => {
  const app = createApp();
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', email: 'alice@example.com', password: 'secret123' })
    });

    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.success, true);
    assert.ok(body.data.token);
    assert.equal(body.data.user.email, 'alice@example.com');
  } finally {
    server.close();
  }
});

test('login returns a valid token for existing user', async () => {
  const app = createApp();
  const server = app.listen(0);
  const { port } = server.address();

  try {
    await fetch(`http://127.0.0.1:${port}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Bob', email: 'bob@example.com', password: 'secret123' })
    });

    const response = await fetch(`http://127.0.0.1:${port}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bob@example.com', password: 'secret123' })
    });

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.success, true);
    assert.ok(body.data.token);
  } finally {
    server.close();
  }
});

test('register returns field-specific validation errors', async () => {
  const app = createApp();
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'not-an-email', password: '123' })
    });

    assert.equal(response.status, 422);
    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(body.message, 'The given data was invalid.');
    assert.equal(body.errors.name, 'Name must be at least 2 characters');
    assert.equal(body.errors.email, 'Email must be a valid email address');
    assert.equal(body.errors.password, 'Password must be at least 6 characters');
  } finally {
    server.close();
  }
});

test('protected users route returns user list for authenticated requests', async () => {
  const app = createApp();
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const registerResponse = await fetch(`http://127.0.0.1:${port}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Charlie', email: 'charlie@example.com', password: 'secret123' })
    });
    const registerBody = await registerResponse.json();

    const response = await fetch(`http://127.0.0.1:${port}/api/users`, {
      headers: { Authorization: `Bearer ${registerBody.data.token}` }
    });

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.success, true);
    assert.ok(Array.isArray(body.data));
  } finally {
    server.close();
  }
});
