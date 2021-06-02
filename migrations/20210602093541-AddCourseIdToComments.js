'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comments', 'courseId', {type: Sequelize.INTEGER });
  },
  down: async (queryInterface, Sequelize) => {
  }
};
