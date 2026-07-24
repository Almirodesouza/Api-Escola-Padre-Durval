'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      homeroom_teacher :{
        type: Sequelize.STRING,
        allowNull: false,
      },
      shift: {
        type: Sequelize.ENUM('matutino', 'vespertino', 'noturno'),
        allowNull: false,
      },
      school_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_students: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('classes');
  },
};
