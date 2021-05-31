'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    totalEstimatedMin: DataTypes.INTEGER,
    programType: DataTypes.STRING,
    courseOrder: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};