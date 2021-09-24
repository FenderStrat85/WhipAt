"use strict";
const router = require("express").Router();
const authMiddleware = require("./middlewares/auth");
const { register, login, logout } = require("./controllers/auth/auth");
const {
  createMeet,
  getMyMeets,
  getJoinedMeets,
  getJoinMeets,
} = require("./controllers/meets/meets");
const { searchUser } = require("./controllers/friends/search");
//TODO: Add routes

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/my/profile", authMiddleware);
router.get("/user/profile/:user_name", authMiddleware); // user user's profile
router.post("/create/meet", authMiddleware, createMeet); //create a meet
router.get("/my/meets", authMiddleware, getMyMeets); //show meets created by user
router.get("/joined/meets", authMiddleware, getJoinedMeets); //show meets join
router.get("/join/meets", authMiddleware, getJoinMeets); // show meets to be joined
router.post("/search/users", authMiddleware, searchUser); // show meets to be joined

router.get("/logout", authMiddleware);

module.exports = router;
