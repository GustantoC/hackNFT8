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
    }
  };
  NFT.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    availability: DataTypes.BOOLEAN,
    UserId: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate:(nft,options)=>{
        
      }
    },
    sequelize,
    modelName: 'NFT',
  });
  return NFT;
};