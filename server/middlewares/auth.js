const db = require("../models/db");

const authMiddleware = async (req, res, next) => {
  try {
    //sid is the session id
    const { sid } = req.session;
    console.log("sid", sid);
    const user = await db.User.findByPk(sid);
    // console.log(user);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
