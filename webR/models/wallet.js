const Sequelize= require('sequelize');
const sequelize =require('../utility/database');

const Wallet = sequelize.define('wallet',{
    walletid: {
        type: Sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    walletpassword: {
        type: Sequelize.STRING,
        allowNull: false
    },

    rcoinamount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    }
});
module.exports = Wallet;