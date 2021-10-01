const db = require('../models/db');

// eslint-disable-next-line consistent-return


const authMiddleware = async (req, res, next) => {
  try {
    // sid is the session id
    const { sid } = req.session;
    const user = await db.User.findByPk(sid);
    // console.log(user);
    if (!user) throw new Error();

  console.log(JSON.stringify(user), 'user');
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

// const authMiddlewareMock = async (req,res,next) => {

//   req.user = {

//   };
//   next()
// }

module.exports = authMiddleware;
