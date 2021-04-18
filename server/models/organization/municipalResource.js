const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../../utils/database')


const MunicipalResource = sequelize.define('MunicipalResource', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment:'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'guid',
  },
  code: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'Код',
  },
  isDeleted:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    comment:'Удален?',
  },
  municipalResourceName:{
    type: DataTypes.STRING(255),
    allowNull: true,
    comment:'Полное название',
  },
  name:{
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'Название',
  },
  canLinkWithDevice:{
    type: DataTypes.BOOLEAN,
    allowNull: true,
    comment:'Исп. в счетчиках?',
  }
})

module.exports.MunicipalResource = MunicipalResource


const OrganizationRoles = sequelize.define('OrganizationRoles', {
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment:'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'guid',
  },
  code: {
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'Код',
  },
  shortName:{
    type: DataTypes.STRING(255),
    allowNull: true,
    comment:'Короткое название',
  },
  fullName:{
    type: DataTypes.STRING(36),
    allowNull: true,
    comment:'Полное название',
  }
})

module.exports.OrganizationRoles = OrganizationRoles


