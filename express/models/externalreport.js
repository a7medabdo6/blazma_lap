"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class externalReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      externalReport.belongsTo(models.Customer, {
        as: "customer",
        foreignKey: "customerId",
      });
    }
  }
  externalReport.init(
    {
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customer", // Can be both a string representing the table name or a Sequelize model
          key: "id",
        },
      },
      customer_external_report: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameofExternalReport: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExternalReport",
      tableName: "externalReports",
    }
  );
  return externalReport;
};
