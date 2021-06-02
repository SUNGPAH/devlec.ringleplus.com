'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('UserCourseClips', 'status', {type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
