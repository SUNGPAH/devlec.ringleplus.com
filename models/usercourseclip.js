'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourseClip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserCourseClip.init({
    userId: DataTypes.INTEGER,
    courseClipId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserCourseClip',
  });
  return UserCourseClip;
};