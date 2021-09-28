"use strict";
const db = require("../../models/db");
const { Op } = db;

const searchUser = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { search_bar } = req.body;
    console.log(search_bar);
    //grab a list of all users except the user making the request that match search
    const userList = await db.User.findAll({
      where: {
        _id: { [Op.not]: user_id },
        user_name: { [Op.like]: `${search_bar}%` },
      },
    });

    // make a list of current user's friends
    const currentFriends = await db.Following.findAll({
      where: { user_id },
    });

    //loop through searched users and check if they appear in the
    //current friends list
    //if they are, they get friendship property to true, else false
    for (let searchedUser of userList) {
      for (let currentFrie of currentFriends) {
        if (
          currentFrie.dataValues.follows_user_name ===
          searchedUser.dataValues.user_name
        ) {
          searchedUser.dataValues.friendShip = true;
        } else {
          searchedUser.dataValues.friendShip = false;
        }
      }
    }
    res.send(userList);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const addFriend = async (req, res) => {
  try {
    const currentUser_id = req.user._id;

    //friend var contains the username
    const { friend } = req.body;

    //ceate friendship
    const result = await db.Following.create({
      follows_user_name: friend,
      user_id: currentUser_id,
    });

    //increase user following count
    const incUser = await db.User.increment("following_count", {
      by: 1,
      where: { _id: currentUser_id },
    });
    //add increase friend follower count
    const incFriend = await db.User.increment("follower_count", {
      by: 1,
      where: { user_name: friend },
    });

    console.log("inc", incUser);
    console.log("dec", incFriend);
    res.send(true);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.send(false);
    res.status(500);
  }
};

const removeFriend = async (req, res) => {
  try {
    const currentUser_id = req.user._id;

    //friend var contains the username
    const { friend } = req.body;

    //get friendShip
    const friendShip = await db.Following.findOne({
      where: {
        follows_user_name: friend,
        user_id: currentUser_id,
      },
    });
    console.log(friendShip);

    //destory friendship
    await friendShip.destroy();

    //decrease user following count
    const decUser = await db.User.increment(
      { following_count: -1 },
      {
        where: { _id: currentUser_id },
      }
    );
    //add decrease friend follower count
    const decFriend = await db.User.increment(
      { follower_count: -1 },
      {
        where: { user_name: friend },
      }
    );
    console.log(friend);
    console.log("inc", decUser);
    console.log("dec", decFriend);

    res.send(false);
    res.status(201);
  } catch (error) {
    console.log(error);
    res.send(true);
    res.status(500);
  }
};

module.exports = { searchUser, addFriend, removeFriend };
