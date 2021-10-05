import express, { Request, Response, NextFunction } from 'express';
import Session from 'express-session'

// We have to use declaration merging to combine the user and session types
//By virute of importing express-session in index.ts, a session interface(object in js) is added to the request interface(object in js)
//BUT the instance of session is not defined, so we need to define it below.

// declare module 'express-session' {
//   interface Session {
//     // [key:string]: any;
//     name: 'sid'
//     sid: string
//   }
// }


//Session no used as the SID is a string. Destructing does not seem to work in TS.
//So need to access SID through req.session.sid that is added when a user logs in or registers


const db = require('../models/db');

// eslint-disable-next-line consistent-return

const authMiddleWare = async (req: any, res: express.Response, next: NextFunction) => {
  try {
    // sid is the session id
    //sid is of type string and already exists on the req.session interface.
    console.log(req.session.Session, 'REQUEST.session.Session');

    const sid: string = req.session.sid;
    console.log('typeof sid', typeof sid);
    console.log('sid', sid)

    const user = await db.User.findByPk(sid);
    // console.log(user);
    console.log('USERrrrrrrrrrrrr', user);
    if (!user) throw new Error();

    //setting req to any rather than an instance of Request as done in index.ts means that interfaces can be added.
    //To add interfaces to the Request object as defined in express we need to completed declaration merging.
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

export = authMiddleWare;
