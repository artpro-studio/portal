const { Sequelize } = require('sequelize');

//Dev
const sequelize = new Sequelize('portal', 'postgres', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5435,
  dialectOptions: {
    encrypt: true
  }
});




module.exports = sequelize
