"use strict";
const { v4: uuidv4 } = require("uuid");
const db = require("../../models/db");
const { Op } = db;

const createMeet = async (req, res) => {
  try {
    const user = req.user;

    const newCar_Meet = {
      ...req.body,
      creator_id: user._id,
      _id: uuidv4(),
    };
    //create a new meet
    const newCarMeet = await db.Car_Meets.create(newCar_Meet);

    res.status(201);
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
    const _id = req.user._id;
    // console.log("JoinedMeets");
    const result = await db.User.findAll({
      where: { _id: _id },
      include: db.Car_Meets,
    });

    const carMeets = result[0].Car_Meets;
    // console.log(carMeets);
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

    //get list of user followers
    const user_friends_list = await db.Following.findAll({
      where: { user_id },
    });

    // console.log("friends LIst", user_friends_list);

    //get a list of the requsters joined meets
    //we will use this to not render already joined meets
    const result = await db.User.findAll({
      where: { _id: user_id },
      include: db.Car_Meets,
    });
    const joinedCarMeets = result[0].Car_Meets;
    // console.log("joined car meet", joinedCarMeets);

    const list_of_friends_meets = [];

    //get the User table information from each friendList entry
    for (let friend of user_friends_list) {
      const user = await db.User.findOne({
        where: { user_name: friend.dataValues.follows_user_name },
      });
      // console.log("user", user);

      //use user information to get  meets created by the friend
      const meets = await db.Car_Meets.findAll({
        where: { creator_id: user.dataValues._id },
      });
      // console.log("meets", meets);

      if (!joinedCarMeets.length) {
        console.log("here");
        list_of_friends_meets.push(...meets);
      } else {
        for (let meet of meets) {
          for (let joinedMeet of joinedCarMeets) {
            // console.log("joined meet", joinedMeet);
            //if meet not been joined, the push to array to be return to client
            if (meet.dataValues._id !== joinedMeet.dataValues._id) {
              // console.log("for loop meet", meet);
              list_of_friends_meets.push(meet);
            }
          }
        }
      }

      // console.log("meets", meets);

      //      list_of_friends_meets.push(...meets);
    }
    // console.log("user's friend's user profile", list_of_friends_meets);

    res.send(list_of_friends_meets);
    res.status(200);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const leaveAMeet = async (req, res) => {
  try {
    const currentUser = req.user;

    const meet = req.body;

    //get meet model
    const meetInstance = await db.Car_Meets.findOne({
      where: { _id: meet._id },
    });

    //remove user from meet
    meetInstance.removeUser(currentUser);

    res.send(false);
    res.status(201);
  } catch (error) {
    console.log(error);
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
};
