"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class contactus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contactus.init(
    {
      username: DataTypes.STRING,
      message: DataTypes.STRING,
      phone_Number: DataTypes.INTEGER,
      read: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "contactus",
      modelName: "Contactus",
    }
  );
  return contactus;
};
