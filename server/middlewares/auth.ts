import { Request, Response, NextFunction } from 'express';

// We have to use declaration merging to combine the user and session types
//By virute of importing express-session in index.ts, a session interface(object in js) is added to the request interface(objectin js)
//BUT the instance of session is not defined, so we need to define it below.
interface Session {
  name: 'sid'
  sid: string
}

//Session no used as the SID is a string. Destructing does not seem to work in TS.
//So need to access SID through req.session.sid that is added when a user logs in or registers


const db = require('../models/db');

// eslint-disable-next-line consistent-return

const authMiddleWare = async (req: any, res: Response, next: NextFunction) => {
  try {
    // sid is the session id
    //sid is of type string and already exists on the req.session interface.
    console.log(req.body, 'REQUEST BODY');

    const sid: string = req.session.sid;
    console.log(typeof sid, 'SID');

    const user = await db.User.findByPk(sid);
    // console.log(user);
    console.log(user, 'USER');
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
