/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
require('dotenv').config();
const db = {};

// TODO: need to set up .env
// username & password from Adriano: tempadmin & nimdapmet
// reset to postgres defaults
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '1234';
const DB_PORT = process.env.DB_PORT || 5432;

const sequelize = new Sequelize({
  database: process.env.CURRENT_OPERATING_MODE == 'test' ? 'whipat-test' : 'whipat',
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: '127.0.0.1',
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

const files = fs.readdirSync(__dirname);

// eslint-disable-next-line no-restricted-syntax
for (const file of files) {
  if (file !== 'db.js') {
    // eslint-disable-next-line import/no-dynamic-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.User.belongsToMany(db.Car_Meets, { through: 'Enrolled_Meets' });
db.Car_Meets.belongsToMany(db.User, { through: 'Enrolled_Meets' });

db.User.hasMany(db.Following, {
  foreignKey: 'user_id',
});
db.Following.belongsTo(db.User);

module.exports = db;
