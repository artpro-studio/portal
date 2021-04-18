const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../utils/database')
const { Organization } = require('../organization')


const User = sequelize.define('User', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment:'id',
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'Имя',
  },
  lastName: {
    type: DataTypes.STRING,
    comment:'Фамилия',
    // allowNull defaults to true
  },
  login: {
      type: DataTypes.STRING,
      allowNull: false,
      comment:'Логин',
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment:'Пароль',
    }
})

module.exports.User = User


const Role = sequelize.define('Role', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment:'id',
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment:'Символьный код',
  },
  name: {
    type: DataTypes.STRING,
    comment:'Название',
    // allowNull defaults to true
  },
})

module.exports.Role = Role


Role.hasOne(User, {
  foreignKey: {
    name: 'Roles',
    comment:'Роли',
  },
  name: 'Role',
  comment:'Роли',
})
User.belongsTo(Role)


Organization.hasOne(User, {
  foreignKey: {
    comment:'Организации',
  },
  name: 'Organization',
  comment:'Оргназицаия',
})
User.belongsTo(Organization)

