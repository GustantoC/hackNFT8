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
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
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