const express = require('express');
const router = require('../../router');
const session = require('express-session');
const supertest = require('supertest');
const db = require('../../models/db');

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

  afterEach(async () => {
    const user = await db.User.findOne({ where: { user_name: 'banjo' } })
    if (!user) return
    await user.destroy();
  })

  it('user should be able to register', async () => {
    const newUser = {
      _id: '',
      user_name: 'banjo',
      password: '1234',
      user_email: 'banjo@banjo.com',
      make: 'Vauxhall',
      model: 'Corsa',
      year: '1995',
    }

    const result = await request.post('/register')
      .send(newUser)
    expect(result.body.user_name).toBe(newUser.user_name);
  })

  it('user should be able to login', async () => {
    const user = {
      user_name: 'test',
      password: '123'
    }
    const result = await request.post('/login')
      .send(user)
    expect(result.body.user_name).toBe(user.user_name)
  })
})
