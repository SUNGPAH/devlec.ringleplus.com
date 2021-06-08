'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserThumbup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserThumbup.init({
    userId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER,
    sourceType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserThumbup',
  });
  return UserThumbup;
};