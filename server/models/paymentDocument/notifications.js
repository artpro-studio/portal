const { Sequelize, DataTypes } = require('sequelize')
const { HouseElement } = require('../../models/account/houseElement')
const { HouseIs } = require('../../models/house/houseIS')
const { Organization } = require('../../models/organization/index')
const sequelize = require('../../utils/database')


module.exports.Notifications = Notifications

const Notifications = sequelize.define('Notifications', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    comment: 'id',
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Месяц',
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment:'Год',
  },
  period: {
    type: DataTypes.STRING(10),
    allowNull: false,
    comment:'Период',
  },
  message: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment:'Отчество',
  }
})


let settingOrganization = {
  foreignKey: 'organizationId',
  name: 'organization',
  as: 'organization',
  comment:'Организация',
  constraints: false
}
Organization.hasOne(Notifications, settingOrganization)
Notifications.belongsTo(Organization, settingOrganization)

