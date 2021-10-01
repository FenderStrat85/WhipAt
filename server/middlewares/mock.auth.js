const db = require('../models/db');

// eslint-disable-next-line consistent-return

const MockauthMiddleware = async (req, res, next) => {
  try {
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = MockauthMiddleware;