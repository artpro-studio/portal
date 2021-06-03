const { Sequelize, DataTypes } = require('sequelize')
const { Organization } = require('../../models/organization/index')
const { House } = require('../../models/house/index')
const sequelize = require('../../utils/database')


const HouseIs = sequelize.define('HouseIs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  guid: {
    type: DataTypes.STRING(36),
    comment:'link',
  },
  linkIs: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Ключ из ИС',
  },
  square: {
    type: DataTypes.FLOAT(),
    allowNull: false,
    comment:'Площадь',
  },
  warmSquare: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Отапливаемая площадь',
  },
  personCount: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Количество жильцов',
  },
  floorCount: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Количество этажей',
  },
  commonProperty: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Общественная собственность',
  },
  totalAreaOfAllPremises: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Общая площадь всех помещений',
  },
  totalAreaNonResidentialPremises: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Общая площадь нежилого помещения',
  },
  fullAddress: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment:'Полный адрес',
  },

})


let settingOrg = {
  foreignKey: 'organizationId',
  name: 'organization',
  as: 'organization',
  comment:'Организация',
  constraints: false
}
Organization.hasOne(HouseIs, settingOrg)
HouseIs.belongsTo(Organization, settingOrg)


let settingHouse = {
  foreignKey: 'houseId',
  name: 'house',
  as: 'house',
  comment:'Дом',
  constraints: false
}
Organization.hasOne(House, settingHouse)
House.belongsTo(Organization, settingHouse)


module.exports.HouseIs = HouseIs
