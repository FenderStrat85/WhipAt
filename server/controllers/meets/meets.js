/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const db = require('../../models/db');

const createMeet = async (req, res) => {
  // console.log('res object', res)
  try {
    const { user } = req;
    // console.log('user inside createMeet',user)
    // console.log('req.body inside createMeet', req.body)
    ;
    const newCar_Meet = {
      ...req.body,
      creator_id: user._id,
      _id: uuidv4(),
      meet_location: JSON.stringify(req.body.meet_location),
      meet_date: moment(user.meet_date).format('lll'),
    };
    // create a new meet
    const newCarMeet = await db.Car_Meets.create(newCar_Meet);
    res.status(201);
    res.send(newCarMeet);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getMyMeets = async (req, res) => {
  try {
    const user_id = req.user._id;
    const result = await db.Car_Meets.findAll({
      where: { creator_id: user_id },
    });

    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};
const getJoinedMeets = async (req, res) => {
  try {
    const { _id } = req.user;
    const result = await db.User.findAll({
      where: { _id },
      include: db.Car_Meets,
    });

    const carMeets = result[0].Car_Meets;
    res.send(carMeets);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const getJoinMeets = async (req, res) => {
  try {
    const user_id = req.user._id;

    // get list of user followers
    const user_friends_list = await db.Following.findAll({
      where: { user_id },
    });

    // get a list of the requsters joined meets
    // we will use this to not render already joined meets
    const result = await db.User.findAll({
      where: { _id: user_id },
      include: db.Car_Meets,
    });
    const joinedCarMeets = result[0].Car_Meets;

    const list_of_friends_meets = [];

    // get the User table information from each friendList entry
    for (const friend of user_friends_list) {
      const user = await db.User.findOne({
        where: { user_name: friend.dataValues.follows_user_name },
      });

      // use user information to get  meets created by the friend
      const meets = await db.Car_Meets.findAll({
        where: { creator_id: user.dataValues._id },
      });

      if (joinedCarMeets.length < 1) {
        list_of_friends_meets.push(...meets);
      } else {
        // const allMeets = meets.map((meet) => meet.dataValues._id);
        const allJoined = joinedCarMeets.map((meet) => meet.dataValues._id);

        meets.forEach((meet) => {
          if (!allJoined.includes(meet.dataValues._id)) {
            list_of_friends_meets.push(meet);
          }
        });
      }
    }
    // console.log("user's friend's user profile", list_of_friends_meets);

    res.send(list_of_friends_meets);
    res.status(200);
  } catch (error) {
    res.status(500);
  }
};

const joinAMeet = async (req, res) => {
  try {
    const user_id = req.user._id;
    const meet = req.body;
    const getJoinedMeet = await db.Car_Meets.findOne({
      where: { _id: meet._id },
    });
    await getJoinedMeet.addUser(user_id);

    await db.User.findAll({
      where: { _id: user_id },
      include: db.Car_Meets,
    });

    res.status(200).end();
  } catch (error) {
    res.status(500);
  }
};

const leaveAMeet = async (req, res) => {
  try {
    const currentUser = req.user;

    const meet = req.body;

    // get meet model
    const meetInstance = await db.Car_Meets.findOne({
      where: { _id: meet._id },
    });

    // remove user from meet
    meetInstance.removeUser(currentUser);

    res.send(false);
    res.status(201);
  } catch (error) {
    res.send(true);
    res.status(500);
  }
};

const deleteMeet = async (req, res) => {
  try {
    const meet = req.body;

    // get meet model
    await db.Car_Meets.destroy({
      where: { _id: meet._id },
    });

    // remove user from meet
    // meetInstance.removeUser(currentUser);

    res.send(false);
    res.status(201);
  } catch (error) {
    res.send(true);
    res.status(500);
  }
};

module.exports = {
  createMeet,
  getMyMeets,
  getJoinedMeets,
  getJoinMeets,
  joinAMeet,
  leaveAMeet,
  deleteMeet,
};
