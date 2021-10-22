'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.NFT,{foreignKey:"UserId"})
      User.hasMany(models.PriceHistory,{foreignKey:"buyerId"})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: { msg:"username required"},
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: { msg:"password required"},
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: { msg:"email required"},
      }
    },
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(user){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(user.password,salt)
        user.password = hash
        //untuk compare password pakai bcrypt.compareSync(<input>,<hash>)
        //<hash> itu password dari db
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};