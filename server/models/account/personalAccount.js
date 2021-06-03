const { Sequelize, DataTypes } = require('sequelize')
const { HouseElement } = require('../../models/account/houseElement')
const { HouseIs } = require('../../models/house/houseIS')
const { Organization } = require('../../models/organization/index')
const sequelize = require('../../utils/database')


module.exports.PersonalAccount = PersonalAccount

const PersonalAccount = sequelize.define('PersonalAccount', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  lsIs: {
    type: DataTypes.STRING(36),
    comment:'Номер лицевого счета в ИС',
  },
  lsGIS: {
    type: DataTypes.STRING(36),
    allowNull: false,
    comment:'Идентификатор ГИС',
  },
  personSurname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Фамилия',
  },
  personName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Имя',
  },
  personLastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Отчество',
  },
  warmSquare: {
    type: DataTypes.Float(),
    allowNull: false,
    comment:'Отапливаемая площадь',
  },
  square: {
    type: DataTypes.Float(),
    allowNull: false,
    comment:'Общая площадь',
  },
  livingSquare: {
    type: DataTypes.Float(),
    allowNull: false,
    comment:'Жилая площадь',
  },
  personCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Количество проживающих',
  },
  regPersonCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Количество зарегистрированных',
  },
  missingPersonCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Количество отсутствующих',
  },
  ownType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Тип владения',
  },
  roomType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Тип комнаты',
  }
})

let settingEls = {
  foreignKey: 'elsId',
  name: 'els',
  as: 'els',
  comment:'ЕЛС',
  constraints: false
}
HouseElement.hasOne(PersonalAccount, settingEls)
PersonalAccount.belongsTo(HouseElement, settingEls)


let settingHouseIs = {
  foreignKey: 'houseIsId',
  name: 'houseIs',
  as: 'houseIs',
  comment:'Дом из ИС',
  constraints: false
}
HouseIs.hasOne(PersonalAccount, settingHouseIs)
PersonalAccount.belongsTo(HouseIs, settingHouseIs)


let settingOrganization = {
  foreignKey: 'organizationId',
  name: 'organization',
  as: 'organization',
  comment:'Организация',
  constraints: false
}
Organization.hasOne(PersonalAccount, settingOrganization)
PersonalAccount.belongsTo(Organization, settingOrganization)

