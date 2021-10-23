/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../../models/db');
const express = require('express')
// import express from 'express'

// eslint-disable-next-line consistent-return
const register = async (req, res) => {
  const { user_name, password } = req.body;
  const user = await db.User.findOne({ where: { user_name } });

  if (user) {
    // user already exists
    return res.status(409);
  }
  try {
    // check if password is empty
    const hash = await bcrypt.hash(password, 10);
    // create new entry for db
    const newUser = new db.User({
      ...req.body,
      _id: uuidv4(),
      password: hash,
    });
    // save new user in the db
    const user = await newUser.save();
    // make new session id the prim key of db user entry
    req.session.sid = user._id;
    // return user to client
    user.password = null;

    res.status(201).send(user);
  } catch (error) {
    res.status(400);
  }
};

const login = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await db.User.findOne({ where: { user_name } });

    // check if provided password is true or false
    const passValidation = await bcrypt.compare(password, user.password);

    if (!passValidation) throw new Error();
    req.session.sid = user._id;
    user.password = null;
    res.status(200).send(user);
  } catch (error) {
    res.status(401);
  }
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500);
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
};

module.exports = { register, login, logout };
