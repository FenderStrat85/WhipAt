const express = require('express');
const router = require('../../router');
const supertest = require('supertest');
const db = require('../../models/db');
const { login, register } = require('../auth/auth');


describe('Integration tests for meets api calls to database', () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app)


  // beforeAll(async () => {

  //   const req = {
  //     body: {
  //       user_name: 'Testman',
  //       password: 'ajax'
  //     },
  //     session: {}
  //   }
  //   const newUser = await register(req)
  //   console.log(newUser)
  // })

  // afterEach(async () => {
  //   await db.sequelize.sync({ force: true })
  // });

  it('Should allow users to register a new meet', async (done) => {
    const meetData = {
      _id: '97005e1e-9c48-4ab2-b18c-265492216b89',
      creator_id: '97005e1e-9c48-4ab2-b18c-265492216b89',
      meet_name: 'Test meet',
      meet_date: '1/10/21',
      meet_description: 'Test description',
      meet_location: 'Test location'
    }
    try {
      const result = await request.post('/create/meet')
        .send(meetData)
      console.log(await db.Car_meets.findAll());
    } catch (error) {
      console.log(error);
    }

    try {
      const meet = await db.Car_Meets.findOne({ where: { meet_name: 'Test meet' } });
      expect(meet.meet_name).toBe(meetData.meet_name)
      done()
    } catch (error) {
      console.log(error);
    }
  })

});
