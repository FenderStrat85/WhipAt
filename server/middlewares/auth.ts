import { Request, Response, NextFunction } from 'express';

// We have to use declaration merging to combine the user and session types
//By virute of importing express-session in index.ts, a session interface(object in js) is added to the request interface(objectin js)
//BUT the instance of session is not defined, so we need to define it below.
interface Session {
  name: 'sid'
}

//The interface below is not currently needed.


const db = require('../models/db');

// eslint-disable-next-line consistent-return

const authMiddleWare = async (req: any, res: Response, next: NextFunction) => {
  try {
    // sid is the session id
    //sid is an instance of the session instance declared above.
    const sid: Session = req.session;
    const user = await db.User.findByPk(sid);
    // console.log(user);
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
