'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseClip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CourseClip.init({
    courseId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    vodUuid: DataTypes.STRING,
    estimatedMin: DataTypes.INTEGER,
    documentUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CourseClip',
  });
  return CourseClip;
};