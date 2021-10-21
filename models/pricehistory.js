'use strict';
const formatDate = require('../helpers/formatDate')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PriceHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
    formatDateBought(){
      return formatDate(this.time)
    }
  };
  PriceHistory.init({
    NFTId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    priceAt: DataTypes.INTEGER,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PriceHistory',
  });
  return PriceHistory;
};