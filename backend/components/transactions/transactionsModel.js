const sequelize = require('../../helpers/mysql-db-helper');
const { DataTypes } = require('sequelize');

const Transactions = sequelize.define('transactions', {
    // Model attributes are defined here
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    wholesalerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    goodsId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deliverySendDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date().toISOString(),
    },
    deliveryRecieveDate: {
        type: 'TIMESTAMP',
        allowNull: true
    },
    deliveryDesc: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
  });

  module.exports = Transactions