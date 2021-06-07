'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserReview extends Model {
    static associate(models) {
    }
  };
  UserReview.init({
    userId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'UserReview',
  });
  return UserReview;
};