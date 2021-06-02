'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserCourses', 'currentCourseClipId', {type: Sequelize.INTEGER });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
