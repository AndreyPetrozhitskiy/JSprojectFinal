const {Sequelize} = require('sequelize')
require('dotenv').config();
module.exports = new Sequelize(
    process.env.DB_NAME, //имя бд
    "postgres", // имя пользователя бд - по стоку лучше postgres
    process.env.DB_PASSWORD, // пароль от бд 
    {
        dialect: 'postgres', // диалект 
        host: process.env.DB_HOST, // хост
        port: process.env.DB_PORT // порт
    }
)