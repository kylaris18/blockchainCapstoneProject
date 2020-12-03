const sequelize = require('../../helpers/mysql-db-helper');
const { DataTypes } = require('sequelize');

const User = require('./userEnrollmentModel')

const Wholesaler = sequelize.define('Wholesaler', {
    // Model attributes are defined here
    wholesalerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    storeName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    addressLine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipcode: {
        type: DataTypes.STRING
    },
    latlong: {
        type: DataTypes.STRING
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wholesalerDesc: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  User.hasMany(Wholesaler, {foreignKey: 'userId'})
  Wholesaler.belongsTo(User, {foreignKey: 'userId'});

  module.exports = Wholesaler