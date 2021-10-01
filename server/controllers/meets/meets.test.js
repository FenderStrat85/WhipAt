const express = require('express');
const router = require('../../router');
const supertest = require('supertest');
const db = require('../../models/db');

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

  it('Should allow users to register a new meet', async () => {
    const meetData = {
      meet_name: 'Test meet',
      meet_date: '1/10/21',
      meet_description: 'Test description',
      meet_location: 'Test location'
    }

    const result = await request.post('/create/meet')
      .send(meetData)
    console.log(result.body, 'result');
    expect(result.body.meet_name).toBe(meetData.meet_name)

    // const meet = await db.Car_Meets.findOne({ where: { meet_name: 'Test meet' } });
    // expect(meet.meet_name).toBe(meetData.meet_name)

  })

});
