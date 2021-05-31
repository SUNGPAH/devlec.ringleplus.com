'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserPrograms', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      programId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['userId', 'programId']
        }
      ]
    }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserPrograms');
  }
};