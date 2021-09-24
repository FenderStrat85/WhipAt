"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const pg = require("pg");
const { Op } = require("sequelize");
const db = {};

//TODO: need to set up .env
const DB_USERNAME = process.env.DB_USERNAME || "tempadmin";
const DB_PASSWORD = process.env.DB_PASSWORD || "nimdapmet";
const DB_PORT = process.env.DB_PORT || 5432;

const sequelize = new Sequelize({
  database: "whipat",
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: "127.0.0.1",
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
});

const files = fs.readdirSync(__dirname);

for (let file of files) {
  if (file !== "db.js") {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

//TODO: use db object to create the respective associations
db.User.belongsToMany(db.Car_Meets, { through: "Enrolled_Meets" });
db.Car_Meets.belongsToMany(db.User, { through: "Enrolled_Meets" });

db.User.hasMany(db.Following, {
  foreignKey: "user_id",
});
db.Following.belongsTo(db.User);

module.exports = db;
