'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      List.belongsTo(models.User)
    }
  }
  List.init({
    name: DataTypes.STRING,
    name_en: DataTypes.STRING,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    location: DataTypes.STRING,
    phone: DataTypes.STRING,
    google_map: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};