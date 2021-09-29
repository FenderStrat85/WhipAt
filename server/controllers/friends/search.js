/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
const db = require('../../models/db');

const { Op } = db;

const searchUser = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { search_bar } = req.body;
    // grab a list of all users except the user making the request that match search
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

    // loop through searched users and check if they appear in the
    // current friends list
    // if they are, they get friendship property to true, else false
    for (const searchedUser of userList) {
      for (const currentFrie of currentFriends) {
        if (
          currentFrie.dataValues.follows_user_name
          === searchedUser.dataValues.user_name
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
    res.status(500);
  }
};

const addFriend = async (req, res) => {
  try {
    const currentUser_id = req.user._id;

    // friend var contains the username
    const { friend } = req.body;

    // ceate friendship
    await db.Following.create({
      follows_user_name: friend,
      user_id: currentUser_id,
    });

    // increase user following count
    await db.User.increment('following_count', {
      by: 1,
      where: { _id: currentUser_id },
    });
    // add increase friend follower count
    await db.User.increment('follower_count', {
      by: 1,
      where: { user_name: friend },
    });

    res.send(true);
    res.status(201);
  } catch (error) {
    res.send(false);
    res.status(500);
  }
};

const removeFriend = async (req, res) => {
  try {
    const currentUser_id = req.user._id;

    // friend var contains the username
    const { friend } = req.body;

    // get friendShip
    const friendShip = await db.Following.findOne({
      where: {
        follows_user_name: friend,
        user_id: currentUser_id,
      },
    });

    // destory friendship
    await friendShip.destroy();

    // decrease user following count
    await db.User.increment(
      { following_count: -1 },
      {
        where: { _id: currentUser_id },
      },
    );
    // add decrease friend follower count
    await db.User.increment(
      { follower_count: -1 },
      {
        where: { user_name: friend },
      },
    );

    res.send(false);
    res.status(201);
  } catch (error) {
    res.send(true);
    res.status(500);
  }
};

module.exports = { searchUser, addFriend, removeFriend };
