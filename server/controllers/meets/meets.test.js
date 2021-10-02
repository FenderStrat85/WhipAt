const express = require('express');
const router = require('../../router');
const supertest = require('supertest');
const db = require('../../models/db');
const {createMeet} = require ('./meets');
const { response } = require('express');

describe('Integration tests for meets api calls to database', () => {

  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app)

  it('Should allow users to register a new meet in the database after going through router, checking the information returned is wht was added', async () => {
    const meetData = {
      meet_name: 'Test meet',
      meet_date: '1/10/21',
      meet_description: 'Test description',
      meet_location: 'Test location'
    }

    //Cress between integrated and e2e test = > simulating an api call => Similar to a postman request
    //checks router => middleware => createMeet function and because this is going through router we receive a res object.
    //Therefore it is possible to test the information contained in the res.body property
    //Uses mock auth to avoid session sid property
    const result = await request.post('/create/meet')
      .send(meetData)
    expect(result.body.meet_name).toBe(meetData.meet_name)
    expect(result.body.meet_description).toBe(meetData.meet_description)
  })

  it('createMeet function should create a new meet in the database', async () => {
    const req = {
      body : {
        meet_name: 'Tokyo Meet',
        meet_date: '2021-10-03T09:00',
        meet_description: 'Sushi time',
        meet_location: 'Tokyo, Japan'
      },
      user : {
        _id: '20389469-5881-464d-b112-f1c5c6551caf',
        user_name: 'test',
        password: '123'
      }
    }

    //both of the mockResponse object allow us to check what res.status() was called with.
    const mockResponse = () =>  {
      const res = {};
      res.status = jest.fn(),
      res.send = jest.fn()
      return res
    }

    // const mockResponse = () => {
    //   const res= {};
    //   res.status = jest.fn().mockReturnValue(res)
    //   res.send = jest.fn().mockReturnValue(res)
    //   return res
    // }

    const res = mockResponse()


    await createMeet(req, res)
    console.log(res)
    expect(res.status).toHaveBeenCalledWith(201)
  })

});
