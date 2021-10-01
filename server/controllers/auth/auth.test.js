const express = require('express');
const router = require('../../router');
const session = require('express-session');
const supertest = require('supertest');
const db = require('../../models/db');
const { login, register } = require('../auth/auth');

describe('User logins', () => {

  const app = express();
  app.use(express.json());
  app.use(
    session({
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: 'catnip crazy',
      cookie: {
        maxAge: 1000 * 60 * 60, // 1hr
        sameSite: true,
        httpOnly: false,
        secure: false, // make this true in production
      },
    }),
  );
  app.use(router);
  const request = supertest(app)

  const user = {
    user_name: 'test',
    password: '123'
  }

  it('user should be able to login', async () => {

    const result = await request.post('/login')
      .send(user)
    expect(result.body.user_name).toBe(user.user_name)
  })
})
