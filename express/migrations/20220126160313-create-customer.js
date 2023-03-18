"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username_ar: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      username_en: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM({
          values: ["male", "female"],
        }),
        allowNull: false,
      },
      birth: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      passport_Number: {
        type: Sequelize.STRING,
      },
      identity_Number: {
        type: Sequelize.STRING,
      },
      years: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      RefOrg: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      test: {
        type: Sequelize.ENUM({
          values: ["Covid-19 Ag", "Covid-19 Ab", "Covid-19 by RT-PCR"],
        }),
        allowNull: false,
      },
      collectDate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      reportDate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.ENUM({
          values: ["N/A", "N/L", "IU/Ml"],
        }),
        allowNull: false,
      },
      branch: {
        allowNull: false,

        type: Sequelize.STRING,
      },
      border: {
        type: Sequelize.ENUM({
          values: ["Positive", "Negative"],
        }),
        allowNull: false,
      },
      result: {
        type: Sequelize.ENUM({
          values: ["Positive", "Negative"],
        }),
        allowNull: false,
      },
      refDoctor: {
        type: Sequelize.ENUM({
          values: ["herself", "himself"],
        }),
        allowNull: false,
      },
      customer_report: {
        allowNull: false,

        type: Sequelize.STRING,
      },

      customer_image: {
        allowNull: false,

        type: Sequelize.STRING,
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
    await queryInterface.addConstraint("customers", {
      type: "foreign key",
      fields: ["createdBy"],
      name: "createdBy",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customers");
  },
};
