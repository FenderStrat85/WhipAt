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

  beforeAll(async () => {

    const req = {
      body: {
        user_name: 'Testman',
        password: 'ajax'
      }, 
      session: {}
    }
    const newUser = await register(req)
    console.log(newUser)
  })

  // afterEach(async () => {
  //   await db.sequelize.sync({ force: true })
  // });
  
  it('Should allow users to register a new meet', async (done) => {
    const meetData = {
      _id: '8d06efba-72df-43d3-95fb-3a0863e6b5f9',
      creator_id: '988a080d-a8e0-43f2-a7ed-1df35f768a11',
      meet_name: 'Test meet',
      meet_date: '1/10/21',
      meet_description: 'Test description',
      meet_location: 'Test location'
    }
    const res = await request.post('/create/meet')
      .send({ meetData })
    
    const meet = await db.findOne({ where: { meet_name: 'Test meet' } });
    expect(meet.meet_name).toBe(meetData.meet_name)
    done()
  })

});
