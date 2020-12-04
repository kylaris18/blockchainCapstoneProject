const sequelize = require('../../helpers/mysql-db-helper');
const { DataTypes } = require('sequelize');

const goods = sequelize.define('goods', {
    // Model attributes are defined here
    goodsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    farmerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    goodsName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantityType: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    quantityValue: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    amountPerUnit: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    additionalDesc: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    plantationDate: {
        type: 'TIMESTAMP',
        allowNull: true
    },
    harvestDate: {
        type: 'TIMESTAMP',
        allowNull: true
    }
  });

  module.exports = goods