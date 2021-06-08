'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Replies', 'thumbCnt', {type: Sequelize.INTEGER , defaultValue: 0});
    await queryInterface.addColumn('Comments', 'thumbCnt', {type: Sequelize.INTEGER, defaultValue: 0});
  },

  down: async (queryInterface, Sequelize) => {
  }
};
