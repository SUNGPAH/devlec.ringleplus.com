'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCourseClips', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        
      },
      courseClipId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.JSON
        //["started", "done"]
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
          fields: ['userId', 'courseClipId']
        }
      ]
    }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserCourseClips');
  }
};