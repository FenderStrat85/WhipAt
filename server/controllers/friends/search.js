"use strict";
const db = require("../../models/db");
const { Op } = db;

const searchUser = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { search_bar } = req.body;
    console.log(search_bar);
    //grab a list of all users except the user making the request
    const userList = await db.User.findAll({
      where: {
        _id: { [Op.not]: user_id },
        user_name: { [Op.like]: `${search_bar}%` },
      },
    });
    console.log(userList);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = { searchUser };
