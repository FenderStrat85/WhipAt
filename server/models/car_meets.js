module.exports = (sequelize, DataTypes) => sequelize.define('Car_Meets', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  creator_id: {
    // foreign key to User._id
    type: DataTypes.UUID,
    allowNull: false,
  },
  meet_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meet_date: {
    type: DataTypes.STRING,
    allowNull: false, // could be change to true to allow TBA meets.
  },
  meet_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meet_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
