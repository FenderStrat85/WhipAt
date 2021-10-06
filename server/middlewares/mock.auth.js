// eslint-disable-next-line consistent-return

const authMiddleware = async (req, res, next) => {
  try {
    req.user = {
      _id: "20389469-5881-464d-b112-f1c5c6551caf",
      user_name: 'test',
      password: '123'
    }
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;