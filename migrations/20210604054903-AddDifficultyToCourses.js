'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Courses', 'difficulty', {type: Sequelize.STRING });
    await queryInterface.addColumn('Courses', 'subtitle', {type: Sequelize.STRING });
    await queryInterface.addColumn('Courses', 'resultImgUrl', {type: Sequelize.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
