const sequelize = require('../../helpers/mysql-db-helper');
const { DataTypes } = require('sequelize');

const User = require('../user-enrollment/userEnrollmentModel')

const Farmer = sequelize.define('farmer', {
    // Model attributes are defined here
    farmerId: {
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
    farmerType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['livestock', 'crop', 'aquaculture', 'horticulture']],
                msg: 'Invalid value for farmer type'
            }
            
        }
    },
    mainGoods: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['dairy', 'poultry', 'meat', 'hide', 'flower', 'shrub', 'sod', 'fish', 'shellfish', 'grain', 'fiber', 'fruit', 'vegetable']],
                msg: 'Invalid value for main goods field'
            }
        }
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    farmerDesc: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  User.hasMany(Farmer, {foreignKey: 'userId'})
  Farmer.belongsTo(User, {foreignKey: 'userId'});

  module.exports = Farmer