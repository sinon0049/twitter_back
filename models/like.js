'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    static associate(models) {
      // define association here
    }
  }
  like.init({
    UserId: DataTypes.INTEGER,
    TweetId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Like',
  });
  return like;
};