'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Followship extends Model {
    static associate(models) {
      // define association here
      Followship.belongsTo(models.User, {
        foreignKey: 'followerId',
        as: 'Follower'
      })
      Followship.belongsTo(models.User, {
        foreignKey: 'followingId',
        as: 'Following'
      })
    }
  }
  Followship.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    followerId: DataTypes.INTEGER,
    followingId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Followship',
  });
  return Followship;
};