"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visit.init(
    {
      username: DataTypes.STRING,
      phone_Number: DataTypes.INTEGER,
      address: DataTypes.STRING,
      purpose: DataTypes.STRING,
      read: DataTypes.STRING,
      file: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "visits",
      modelName: "Visit",
    }
  );
  return Visit;
};
