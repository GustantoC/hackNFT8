'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PriceHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      NFTId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'NFTs',
          key:'id'
        }
      },
      buyerId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key:'id'
        }
      },
      priceAt: {
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PriceHistories');
  }
};