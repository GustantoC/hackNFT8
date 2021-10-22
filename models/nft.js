'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NFT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NFT.belongsTo(models.User,{foreignKey: "UserId"})
      NFT.hasMany(models.PriceHistory,{foreignKey: "NFTId"})
    }

    convertPrice(){
      return `© ${this.price}`
    }
  };
  NFT.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: { msg:"name required"},
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: { msg:"description required"},
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate:{
        notEmpty: { msg:"price required"},
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: { msg:"imageUrl required"},
      }
    },
    availability: DataTypes.BOOLEAN,
    UserId: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate:(nft,options)=>{
        nft.availability = true
      }
    },
    sequelize,
    modelName: 'NFT',
  });
  return NFT;
};