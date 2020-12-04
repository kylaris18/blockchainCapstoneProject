const sequelize = require('../../helpers/mysql-db-helper');
const { DataTypes } = require('sequelize');

const reviews = sequelize.define('reviews', {
    // Model attributes are defined here
    reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reviewDesc: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
  });

  module.exports = reviews