'use strict'
module.exports = (sequelize, DataTypes) => sequelize.define('Following',{
  _id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true

  },
  follows_user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})