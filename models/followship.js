'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followship extends Model {
    static associate(models) {
      // define association here
    }
  }
  followship.init({
    followerId: DataTypes.INTEGER,
    followingId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Followship',
  });
  return followship;
};