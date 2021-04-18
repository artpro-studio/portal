const { Sequelize } = require('sequelize');

//Dev
// const sequelize = new Sequelize('portal', 'admin', 'admin25', {
//   host: 'localhost',
//   dialect: 'postgres',
//   dialectOptions: {
//     encrypt: true
//   }
// });

//Prod
const sequelize = new Sequelize('portal', 'admin', '4inF0@adMIn25', {
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    encrypt: true
  }
});

module.exports = sequelize
