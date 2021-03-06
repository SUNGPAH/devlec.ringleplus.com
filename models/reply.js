'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reply.init({
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    recommendation: DataTypes.INTEGER,
    content: DataTypes.JSON,
    thumbCnt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reply',
  });
  return Reply;
};