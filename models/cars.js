"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cars.init(
    {
      model: { type: DataTypes.STRING },
      type: { type: DataTypes.STRING },
      price: { type: DataTypes.FLOAT },
      createdBy: { type: DataTypes.STRING },
      deletedBy: { type: DataTypes.STRING },
      updatedBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "cars",
    }
  );
  return cars;
};