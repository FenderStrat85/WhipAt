"use strict";
const { v4: uuidv4 } = require("uuid");
const db = require("../../models/db");

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
    // await newCarMeet.addUser(user._id); this needs to be added when joining a meet

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
    console.log("JoinedMeets");
    const result = await db.User.findAll({
      where: { _id: _id },
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

const getJoinMeets = async () => {};

module.exports = { createMeet, getMyMeets, getJoinedMeets, getJoinMeets };
