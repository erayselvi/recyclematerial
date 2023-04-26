/*const mysql=require('mysql2');
const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'rc_app',
    password: 'sa123'
});
module.exports= connection.promise();*/
const Sequelize = require('sequelize')
const sequelize= new Sequelize('rc-app', 'root', 'sa123', {
    dialect: 'mysql',
    host: 'localhost',

});
module.exports=sequelize;