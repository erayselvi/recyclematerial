const Sequelize=require('sequelize');
const sequelize=require('../utility/database');

const Material = sequelize.define('material',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    carbonvalue: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull:false,
    }
});
module.exports = Material;