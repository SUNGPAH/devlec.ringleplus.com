'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
    }
  };
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    totalEstimatedMin: DataTypes.INTEGER,
    programType: DataTypes.STRING,
    courseOrder: DataTypes.INTEGER,
    preparation: DataTypes.STRING,
    learning: DataTypes.STRING,
    techStacks: DataTypes.JSON,
    difficulty: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    resultImgUrl: DataTypes.STRING,
    numClips: DataTypes.INTEGER,
    uuid: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};
