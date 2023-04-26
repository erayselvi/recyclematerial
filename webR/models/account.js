const Sequelize=require('sequelize');
const sequelize=require('../utility/database');

const Account = sequelize.define('account',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    sname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mail: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pw: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.BOOLEAN,
    },
    carbonamount: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
});
module.exports = Account;