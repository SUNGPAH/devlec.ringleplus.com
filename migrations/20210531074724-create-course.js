'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      totalEstimatedMin: {
        type: Sequelize.INTEGER
      },
      programType: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['Client', 'BackEnd', 'FrontEnd', 'DevOps', 'FullStack']]
        }
      },
      courseOrder: {
        type: Sequelize.INTEGER
      },
      courseClip: {
        type: Sequelize.JSON 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  }
};