const bcrypt = require("bcrypt");
const db = require("../../models/db");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { user_name, password } = req.body;
  const user = await db.User.findOne({ where: { user_name } });

  if (user) {
    //user already exists
    console.log("register, user already exists");
    return res.status(409);
  }
  try {
    //check if password is empty
    const hash = await bcrypt.hash(password, 10);
    //create new entry for db
    const newUser = new db.User({
      ...req.body,
      _id: uuidv4(),
      password: hash,
    });
    //save new user in the db
    const user = await newUser.save();
    //make new session id the prim key of db user entry
    req.session.sid = user._id;
    //return user to client
    user.password = null;
    console.log("user is created");
    res.status(201).send(user);
  } catch (error) {
    console.log("could not create user", error);
    res.status(400);
  }
};

const login = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await db.User.findOne({ where: { user_name } });
    //check if provided password is true or false
    const passValidation = bcrypt.compare(password, user.password);

    if (!passValidation) throw new Error();
    req.session.sid = user._id;
    user.password = null;
    console.log("user is validated");
    res.status(200).send(user);
  } catch (error) {
    console.log("could not authenticate user during logging");
    res.status(401);
  }
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log("could not log user out");
      res.status(500);
    } else {
      res.cleasrCookies("sid");
      res.sendStatus(200);
    }
  });
};

module.exports = { register, login, logout };
