"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      number: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      complement: {
        allowNull: true,
        type: Sequelize.STRING(255),
      },
      users_id: {
        unique: "user_attribute",
        references: {
          model: "Users", // <<< Note, its table's name, not object name
          referencesKey: "id", // <<< Note, its a column name
        },
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
