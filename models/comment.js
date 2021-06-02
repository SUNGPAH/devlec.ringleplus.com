'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
    }
  };
  Comment.init({
    courseId: DataTypes.INTEGER,
    courseClipId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    recommendation: DataTypes.INTEGER,
    content: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};